import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import * as authorApi from "../api/authorApi";
import actionTypes from "./actionType";

export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    //action creator
    dispatcher.dispatch({
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: savedCourse,
    });
  });
}

export function loadCourses() {
  return courseApi.getCourses().then((courses) => {
    //action creator
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses,
    });
  });
}
export function deleteCourse(id) {
  return courseApi.deleteCourse(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      id: id,
    });
  });
}
export function getAuthors() {
  return authorApi.getAuthors().then((author) => {
    dispatcher.dispatch({
      actionType: actionTypes.GET_AUTHORS,
      authors: author,
    });
  });
}
