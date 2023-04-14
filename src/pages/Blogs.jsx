import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Form from "./Form";

const Blogs = (props) => {
  const { item, onDelete, onEdit, onDetails } = props;
  const [showOrHide, setShowOrHide] = useState(false);

  const handleEdit = (blog) => {
    onEdit(blog);
  };
  const handleDelete = (blog) => {
    onDelete(blog);
  };
  function handleDetails(id) {
    // onDetails(id);
    setShowOrHide(!showOrHide);
  }

  return (
    <Grid item md={4} xs={12}>
      {/* md: medium */}
      <Card>
        <CardContent>
          <Typography gutterBottom component={"div"}>
            {/* component: div - break line, not inline */}
            Id: {item.blogId}
          </Typography>
          <Typography gutterBottom component={"p"}>
            {item.title}
          </Typography>
          <Typography
            gutterBottom
            component={"p"}
            marginBottom={0}
            paddingBottom={0}
          >
            Rate:
          </Typography>
          <Typography marginTop={0} padding={0} component={"small"}>
            <Rating value={item.rating} size="small" readOnly />
          </Typography>
          {showOrHide && (
            <Typography gutterBottom component={"p"}>
              Link: {item.url}
            </Typography>
          )}
        </CardContent>
        <CardContent>
          <Form />
        </CardContent>
        <CardActions>
          <Button onClick={() => handleDetails(item.blogId)}>Details</Button>
          <Button onClick={()=> handleEdit(item)}>Edit</Button>
          <Button onClick={() => handleDelete(item)}>Delete</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default Blogs;
