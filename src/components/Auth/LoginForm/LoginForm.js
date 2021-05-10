import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Form, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { setToken, decodeToken } from '../../../utils/token';
import useAuth from '../../../hooks/useAuth';
import '../../../locales/i18n';
import './LoginForm.scss';

const LoginForm = (props) => {
	const [error, setError] = useState('');
	const { t } = useTranslation();
	const { setUser } = useAuth();

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object({
			email: Yup.string().email(t('loginFormWrongEmail')).required(t('loginFormEmailRequired')),
			password: Yup.string().required(t('loginFormPassRequired')),
		}),
		onSubmit: async (formData) => {
			setError('');
			try {
				// use 'formData' to get a successfull authentication
                // get 'token' value from database or backend in order to assign to the localStorage
				//const { token } = data.login;
                const token = "Dsklj82$#%ksjkddWIUKkjsf9298s9d2";
				setToken(token);
				setUser(decodeToken(token));
			} catch (error) {
				setError(error.message);
			}
		},
	});

	return (
		<Form className="login-form" onSubmit={formik.handleSubmit}>
			<Form.Input
				type="text"
				placeholder={t('loginFormUserPass')}
				name="email"
				value={formik.values.email}
				onChange={formik.handleChange}
				error={formik.errors.email}
			/>
			<Form.Input
				type="password"
				placeholder={t('loginFormPassRequired')}
				name="password"
				value={formik.values.password}
				onChange={formik.handleChange}
				error={formik.errors.password}
			/>
			<Button fluid type="submit" className="btn-submit">
				{t('loginFormButton')}
			</Button>
			{error && <p className="submit-error">{error}</p>}
		</Form>
	);
};
function initialValues() {
	return {
		email: '',
		password: '',
	};
}


export default LoginForm;
