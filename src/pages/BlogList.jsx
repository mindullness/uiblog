
import { Button, Container, Grid, Pagination, Paper, Stack, Typography } from '@mui/material'
import client from '../api/client'; // due to export default -> can import any(Name)
import { useEffect, useState } from 'react';
import Blogs from './Blogs';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const BlogList = () => {

    const navigate = useNavigate();

    const [blogs, setBlogs] = useState(
      {
        data: [],
        first: true,
        last: false,
        size: 0,
        number: 0,
        totalElements: 0,
        totalPages: 0,
        empty: true,
      });
  
    useEffect(() => {
      const logIn = async ()=> {
        const data = {username: "user", password: "password"};
        const options = {
          method:"POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          data: qs.stringify(data),
          url: "http://localhost:8080/login",
        };
        await client(options);
        getBlogs();
      }
      logIn();
  
    }, []);
  
  
    const getBlogs = async (page) => {
      const resp = await client.get("/blog" + (page ? "?page=" + (page - 1) : ""));
      console.log(resp.data);
  
      const { content, first, last, size, number, totalElements, totalPages, empty, } = resp.data;
      setBlogs((prev) => ({
        ...prev,
        data: content,
        first, last, size, number, totalElements, totalPages, empty,
      }));
      // setBlogs(resp.data.content); // same as above code
    };
  
    const handleChangePage = async (event, page) => {
      console.log(page);
      getBlogs(page);
    }
  
    const handleDelete = async (blog) => {
  
      await client({
        method: 'delete',
        url: '/blog/delete',
        data: JSON.stringify(blog),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((resp) => {
        if (resp.status === 200) {
          const theRestBlogs = blogs.data.filter((item) => item.blogId !== blog.blogId);
  
          setBlogs((prev) => ({ ...prev, data: theRestBlogs, }));
          console.log(resp);
        } else {
          alert("Failed to delete");
        }
      }).catch((error) => {
        console.log(error);
        alert("Failed to delete");
      });
    }
    const handleDetails = async (id) => {
      const resp = await client.get("/blog/"+id);
      console.log(resp.data);
    }
  
    const handleCreate = ()=>{
        navigate("/blog/create")
    }
    function handleEdit(blog) {
        navigate("/blog/edit", {state: {blog}});
    }
    return (
      <Container>
        <Paper sx={{ padding: "10px" }}>
          {/* sx={{}} : overwrite css */}
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <Typography variant='h3' align="center">My blogs</Typography>
            </Grid>
            <Grid item md={12} xs={12}>
                <Button onClick={handleCreate} variant='contained'>Create Blog</Button>
            </Grid>
            {blogs.data.map((item) => (
              <Blogs
                key={item.blogId}
                item={item}
                onDetails={handleDetails}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
            {!blogs.empty && (
              <Grid item xs={12} md={12}>
                <Stack>
                  <Pagination
                    // variant="outlined" color="primary"
                    count={blogs.totalPages}
                    page={blogs.number + 1}
                    onChange={handleChangePage}
                  />
                </Stack>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container >
    );
  }

export default BlogList;