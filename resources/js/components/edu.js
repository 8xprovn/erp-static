module.exports = (function(){
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    getCoursesByContact: function(params,callback){
        helpers.curlgetapi(API_SERVICE_URL + '/edu/contacts/' + params.contact_id + '/classes',params,callback);
    },
    getDuplicateTeacherSchedule: function(params,callback) {
        helpers.curlgetapi('employee/check_available_teachers',params,callback);
    },
    
    getCalendar:function(params,callback) {
      helpers.curlgetapi(API_SERVICE_URL + '/edu/calendar',params,callback);
    },
    getCoursesLevel: function () {
      helpers.curlgetapi(API_SERVICE_URL + '/course-levels',params,callback);
    },
      getMeeting:function(params,callback) {
          helpers.curlgetapi(API_SERVICE_URL + '/edu/meeting',params,callback);
      },
    getContactByCalendar:function(params,callback) {
      helpers.curlgetapi(API_SERVICE_URL + '/edu/calendar/' + params.calendar_id + '/contacts',params,callback);
    },
    select2ClassesFormat: function (data,selected) {
      var selected = selected;
      result = $.map(data, function (x) {
          result =  {
              id: x.class_id,
              text: x.name + '(' + x.start_date + ')'
          };
          if (x.class_id == selected) {
            result.selected = true;
          }
          return result;
      });
      return result;
    },
    select2CoursesFormat: function (data,selected) {
      var selected = selected;
      result = $.map(data, function (x) {
          result =  {
              id: x.course_id,
              text: x.name
          };
          if (x.course_id == selected) {
            result.selected = true;
          }
          return result;
      });
      return result;
    },
    getClassSchedules:function(params,callback) {
      helpers.curlgetapi(API_SERVICE_URL + '/edu/class-schedules',params,callback);
    },
    select2ScheduleFormat: function (data,selected) {
      var selected = selected;
      result = $.map(data, function (x) {
          result =  {
              id: x.schedule_number,
              text: x.lesson_name + '(Buổi' + x.schedule_number + ') (Ngày '+ x.date + ')'
          };
          if (x.schedule_number == selected) {
            result.selected = true;
          }
          return result;
      });
      return result;
    },
    getStudentsByClass:function(params,callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/edu/classes/' + params.class_id + '/students',params,callback);
    },
    getStudents:function(params,callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/lms/students',params,callback);
    },
    getCourses: function(params,callback){
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/lms/courses/',params,callback);
    },
    getClasses:function(params,callback) {
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/lms/classes',params,callback);
    },
    getCourseDetail: function(params,callback) {
      var course_id = params.course_id;
      delete(params.course_id);
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/lms/courses/' + course_id ,params,callback);
    },
  }
})();
