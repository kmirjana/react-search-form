import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";


const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    author: null,
    category: "",
  });
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; // pulled from the path `courses/:slug
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }
  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author's Id is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    //Form is valid if errors object has no properties
    return Object.keys(_errors).length === 0;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved");
    });
  }
  return (
    <>
      <h2>Manage Courses</h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {/*<Prompt when={true} message="Are you sure you want to leave ?" />{props.match.params.slug}*/}
    </>
  );
};
export default ManageCoursePage;
