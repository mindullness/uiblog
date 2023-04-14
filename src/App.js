

// Router -> react-router-dom
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BlogList from "./pages/BlogList";
import BlogForm from "./pages/BlogForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BlogList/>
  },
  {
    path:'/blog/create',
    element: <BlogForm/>
  }, 
  {
    path:'/blog/edit',
    element: <BlogForm/>
  }
]);

function App() {
  
 
  return (
    <div>
      <RouterProvider router={router}/>
    </div >
  );
}

export default App;
