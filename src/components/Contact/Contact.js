import React from "react";
import useForm from "../../hooks/useForm";
import styles from "./Contact.module.scss";
import Section from "../Layout/Section";
import Container from "../Layout/Container";
import { contactForm } from "../../helpers/form";

const Contact = React.forwardRef((props, ref) => {
  const { renderFormInputs, isFormValid } = useForm(contactForm, styles);
  return (
    <Section
      classes={`${styles.contact} u-bg-gunmetal`}
      padding={true}
      margin={false}
      id="section-contact"
      ref={ref}
    >
      <Container>
        <div className="u-flex u-flex-column u-flex-centered u-margin-top-80">
          <h2 className="h1 u-clr-emeral u-text-center u-margin-bottom-24">
            Contact
          </h2>
          <form className={`${styles["contact__form"]} u-flex u-flex-column`}>
            {renderFormInputs()}
            <button
              className="btn btn-secondary btn--small u-margin-top-8"
              type="submit"
              disabled={!isFormValid()}
            >
              Submit
            </button>
          </form>
        </div>
      </Container>
    </Section>
  );
});

export default Contact;
