const commonInputClassName =
  "w-full px-3 py-2 border rounded focus:outline-none duration-300 transition focus:border-primary-color";
const inputParentClassName = "flex flex-col gap-1 mb-3 w-full ";
import Button from "@/components/shared/Button/Button";
const ContactForm = () => {
  return (
    <div className={`p-4 border rounded-md`}>
      <form>
        <div className="flex flex-col xl:flex-row items-center gap-4">
          <div className={inputParentClassName}>
            <label>
              <strong>Your Name</strong>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className={commonInputClassName}
              required
            />
          </div>

          <div className={inputParentClassName}>
            <label>
              <strong>Your Email</strong>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={commonInputClassName}
              required
            />
          </div>
        </div>
        <div className={inputParentClassName}>
          <label>
            <strong>Subject</strong>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Subject"
            className={commonInputClassName}
            required
          />
        </div>

        <div className={inputParentClassName}>
          <label>
            <strong>Message</strong>
          </label>
          <textarea
            className={commonInputClassName}
            required
            rows={4}
            placeholder="Message"
          ></textarea>
        </div>
        <div className="form-control mt-6 w-full">
          <Button customClass="w-full">Send Message</Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
