import { LoginPayload } from '../../types/auth';
import * as yup from 'yup';

export const LoginBody = yup.object<LoginPayload>(
    {
        email: yup.string().email().required(),
        password: yup.string().required().length(8)
    }
);