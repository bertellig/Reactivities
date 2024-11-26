import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Label } from "semantic-ui-react";
import { useLoginMutation } from "../../app/stores/userStore";
;

export default function LoginForm() {

    //const [login, { isLoading, isError, data }] = useLoginMutation();
    const [login] = useLoginMutation();

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   const credentials = {
    //     username: e.target.username.value,
    //     password: e.target.password.value,
    //   };
    //   login(credentials);
    // };



    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                login(values).catch((error: any) => setErrors({ error: 'Invalid email or password' }))
            }
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput placeholder="Password" name="password" type="password" />
                    <ErrorMessage
                        name='error' render={() => <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />}
                    />
                    <Button loading={isSubmitting} positive content='Login' type="submit" fluid />
                </Form>
            )}

        </Formik>
    )
}




//    return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="username" placeholder="Username" />
//       <input type="password" name="password" placeholder="Password" />
//       <button type="submit">Login</button>
//       {isLoading && <p>Loading...</p>}
//       {isError && <p>Login failed</p>}
//       {data && <p>Login successful</p>}
//     </form>
//   );
// }

