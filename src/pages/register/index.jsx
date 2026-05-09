import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useRegisterUserMutation } from '../../api/register';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password Is Too Short!')
    .max(16, 'Password Is Too Long!')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(6, 'Password Is Too Short!')
    .max(16, 'Password Is Too Long!')
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
  acceptTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [submitError, setSubmitError] = useState('');

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <Link
          to='/'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        >
          <img
            className='w-8 h-8 mr-2'
            src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
            alt='logo'
          />
          ECI
        </Link>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Create an account
            </h1>
            <Formik
              validationSchema={SignupSchema}
              initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
                acceptTerms: false,
              }}
              onSubmit={async ({ email, password }) => {
                try {
                  setSubmitError('');

                  const userPayload = await registerUser({
                    email,
                    password,
                  }).unwrap();

                  if (userPayload.status === 201) {
                    navigate('/login');
                  }
                } catch (error) {
                  setSubmitError(
                    error?.data?.error || 'Failed to create account. Please try again.'
                  );
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className='space-y-4 md:space-y-6'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Your email
                    </label>
                    <Field
                      type='email'
                      name='email'
                      id='email'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                    {errors.email && touched.email ? (
                      <div className='w-full text-red-600 text-sm py-1.5'>
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Password
                    </label>
                    <Field
                      type='password'
                      name='password'
                      id='password'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                    {errors.password && touched.password ? (
                      <div className='w-full text-red-600 text-sm py-1.5'>
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor='confirm-password'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Confirm password
                    </label>
                    <Field
                      type='password'
                      name='confirmPassword'
                      id='confirm-password'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className='w-full text-red-600 text-sm py-1.5'>
                        {errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div className='flex items-start'>
                      <div className='flex items-center h-5'>
                        <Field
                          id='terms'
                          type='checkbox'
                          name='acceptTerms'
                          aria-describedby='terms'
                          className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                        />
                      </div>
                      <div className='ml-3 text-sm'>
                        <label
                          htmlFor='terms'
                          className='font-light text-gray-500 dark:text-gray-300'
                        >
                          I accept the{' '}
                          <Link
                            className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                            to='/about'
                          >
                            Terms and Conditions
                          </Link>
                        </label>
                      </div>
                    </div>
                    {errors.acceptTerms && touched.acceptTerms ? (
                      <div className='w-full text-red-600 text-sm py-1.5'>
                        {errors.acceptTerms}
                      </div>
                    ) : null}
                  </div>
                  <button
                    type='submit'
                    disabled={isLoading}
                    className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                  >
                    {isLoading ? 'Creating account...' : 'Create an account'}
                  </button>
                  {submitError ? (
                    <p className='w-full text-red-600 text-sm py-1.5' role='alert' aria-live='polite'>
                      {submitError}
                    </p>
                  ) : null}
                  <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                    Already have an account?{' '}
                    <Link
                      to='/login'
                      className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                    >
                      Login here
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
