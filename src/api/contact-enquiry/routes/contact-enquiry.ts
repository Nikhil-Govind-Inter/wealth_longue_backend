export default {
  routes: [
    {
      method: "POST",
      path: "/contact-enquiries/complete-enquiry",
      handler: "contact-enquiry.completeEnquiryForm",
      config: {
        auth: false,
      },
    },
  ],
};