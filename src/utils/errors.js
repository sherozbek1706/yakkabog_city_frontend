import { error_notify } from "../shared/notify";

export const Errors = async (error) => {
  if (error) {
    if (error?.response) {
      let {
        status,
        data: { error: errormsg },
      } = error.response;


      if (status === 403) {
        error_notify(errormsg);
      }

      if (status === 400) {
        error_notify(errormsg);
      }

      if (status === 401) {
        error_notify(errormsg);
        localStorage.clear();
        window.setTimeout(() => {
          window.location.assign("/login");
        }, 1000);
      }
    }
  }
};
