import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

function Input(props) {
  return (
    <input
      {...props}
      className="w-full bg-transparent p-4 border rounded-xl border-silver text-lg outline-none focus:border-birdBlue"
    />
  );
}

const validationSchema = yup.object({
  email: yup.string().required("Digite o seu email").email("E-mail invalido"),
  password: yup.string().required("Digite a sua senha"),
});

export function Login({ signInUser }) {
  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios.get("http://localhost:9901/login", {
        auth: {
          username: values.email,
          password: values.password,
        },
      });

      signInUser(res.data);
    },
    validationSchema,
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="h-full flex justify-center">
      <div className="bg-birdBlue lg:flex-1"></div>
      <div className="flex-1 flex items-center justify-center p-12 space-y-6">
        <div className="max-w-md flex-1">
          <h1 className="text-3xl">Acesse sua conta</h1>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="space-y-2">
              <Input
                type="text"
                name="email"
                placeholder="E-mail"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Senha"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <button
              className="w-full bg-birdBlue p-4 rounded-full disabled:opacity-50 text-lg"
              disabled={formik.isSubmitting || !formik.isValid}
              type="submit"
            >
              {formik.isSubmitting ? "Enviando..." : "Entrar"}
            </button>
          </form>
          <span className="text-sm text-silver text-center">
            Nao tem conta{" "}
            <a className="text-birdBlue" href="/signup">
              Se inscreva
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
