import client from '../api/client';

export default function Form() {
  const handleSubmit = async (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const photos = document.querySelector('input[type="file"][multiple]');
    console.log(photos);
    const formData = new FormData();
    for (const [i, photo] of Array.from(photos.files).entries()) {
      formData.append(`photos`, photo);
    }
    console.log(photos);
    // // axios
    await client({
        method: 'post',
        url: '/post/add',
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((resp) => {
        if (resp.status === 200) {
            console.log(resp.data);
        } else {
          alert("Failed to add");
        }
      }).catch((error) => {
        console.log(error);
        alert("Failed to delete");
      });

    // // fetch
    // Read the form data
    // const form = e.target;
    // const photos = document.querySelector('input[type="file"][multiple]');
    // const formData = new FormData();
    // for (const [i, photo] of Array.from(photos.files).entries()) {
    //   formData.append(`photos_${i}`, photo);
    // }
    // console.log(formData);
    // try {
    //   const response = await fetch("http://localhost:8080/post/add", {
    //     method: form.method, // or 'PUT'
    //     body: formData,
    //   }).then((resp) => {
    //     console.log("response header: "+ resp.headers);
    //     console.log("response json: "+ resp.json);
    //     console.log("response: "+ resp.body);
    //   });
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    // // . End "fetch"

  };
  return (
    <>
      <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" multiple name="photos" accept="image/png, image/jpeg, image/jpg" />
        <input type="submit" />
      </form>
    </>
  );
}
