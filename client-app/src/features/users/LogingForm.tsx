import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
}

export default function LoginForm() {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => console.log(values)}
        >
            {({ handleSubmit }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput placeholder="Password" name="password" type="password" />
                    <Button positive content='Login' type="submit" fluid />
                </Form>
            )}

        </Formik>
    )
}
