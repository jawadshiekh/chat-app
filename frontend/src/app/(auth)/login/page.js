"use client";
import { API } from "@/api";
import Button from "@/components/button";
import Input from "@/components/input";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    try {
      const res = await API.loginUser(data);
      if (res) {
        Cookies.set("token", res?.data?.data?.token);

        Cookies.set("id", res?.data?.data?.data?.userId);

        router.push("/");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat bg-[url(https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80)] ">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img
              src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
              width="150"
              alt=""
              srcset=""
            />
            <h1 className="mb-2 text-2xl">Instagram</h1>
            <span className="text-gray-300">Enter Login Details</span>
          </div>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-4 text-lg">
              <Input
                name={"email"}
                placeholder={"johnDoe@email.com"}
                register={register}
                errors={errors}
              />
            </div>

            <div className="mb-4 text-lg">
              <Input
                name={"password"}
                placeholder={"*******"}
                register={register}
                errors={errors}
              />
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <Button text={"Login"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
