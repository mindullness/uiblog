import {
  Button,
  Container,
  Grid,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import client from "../api/client";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state?.blog.blogId ? true : false;

  const initialBlog = {
    blogId: 0,
    title: "",
    url: "",
    posts: null,
    rating: 0,
  };
  const [blog, setBlog] = useState(isEdit?location.state?.blog:initialBlog);


  const handleChange = (e) => {
    // let ratingVal = e.target.name === 'rating'? parseInt(e.target.value,10):0;
    setBlog(
      (prev) => ({
        ...prev,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
        //   rating: ratingVal
      }) // This is async code. Any code below will execute first then setBlog();
    );
  };
  useEffect(() => {
    // console.log(blog);
  }, [blog]);

  const handleAdd = async () => {
    const res = await client.post("/blog/add", blog);
    if(res.status === 201){
        alert("Successfully!");
        navigate(-1);
    }

    // client.post("/blog/add", blog).then(res => {
    //     if(res.status === 201){
    //         setBlog(initialBlog);
    //     }
    //     alert("sent");
    // }).catch(err =>{
    //     console.log(err);
    //     alert("Failed");
    // })
  };
  const handleEdit = async () => {
    const res = await client.put("/blog/update", blog);
    if(res.status === 200){
        alert("Successfully!");
        navigate(-1);
    }
  };

  return (
    <Container>
      <Paper sx={{ padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Typography align="center" variant="h3">
              {isEdit? "Edit" : "Create "} blog
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              value={blog.blogId}
              onChange={handleChange}
              label="Id"
              name="blogId"
              fullWidth
              size="small"
              disabled={isEdit}
            ></TextField>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              value={blog.title}
              onChange={handleChange}
              label="Title"
              name="title"
              fullWidth
              size="small"
            ></TextField>
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              value={blog.url}
              onChange={handleChange}
              label="Url"
              name="url"
              fullWidth
              size="small"
            ></TextField>
          </Grid>
          <Grid item md={12} xs={12}>
            <Rating
              value={blog.rating}
              onChange={handleChange}
              label="Rating"
              name="rating"
              size="large"
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Button onClick={isEdit?handleEdit:handleAdd} variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BlogForm;
