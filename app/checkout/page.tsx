"use client";

import MainLayout from "@/layouts/MainLayout";
import ProductFooterAction from "@/components/panels/ProductPanelAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";

type FormValues = {
  name: string;
  email: string;
  street: string;
  unit?: string;
  postal: string;
};

const schema = Yup.object({
  name: Yup.string().trim().min(2, "Too short").required("Required"),
  email: Yup.string().trim().email("Invalid email").required("Required"),
  street: Yup.string().trim().required("Required"),
  unit: Yup.string().trim().optional(),
  postal: Yup.string().trim().min(3, "Too short").required("Required"),
});

const initialValues: FormValues = {
  name: "",
  email: "",
  street: "",
  unit: "",
  postal: "",
};

export default function CheckoutPage() {
  const total = useMemo(() => 2592, []); // TODO: compute from cart

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values) => {
        // TODO: write to Google Sheet, then Stripe checkout
        console.log("Submit checkout", { values, total });
      }}
      validateOnMount
    >
      {({ isValid, isSubmitting, submitForm }) => (
        <MainLayout
          footerContent={
            <ProductFooterAction
              price={total}
              isTotal
              buttonLabel="Make Payment"
              disabled={!isValid || isSubmitting}
              onAddToCart={submitForm}
            />
          }
        >
          <SectionTitle>Your Details</SectionTitle>

          {/* Name / Email */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FieldBlock
              label="Your Name"
              name="name"
              placeholder="James Hoffman"
            />
            <FieldBlock
              label="Email Address"
              name="email"
              type="email"
              placeholder="james@gmail.com"
            />
          </div>

          {/* Divider */}
          <hr className="my-8 border-slate-200" />

          {/* Street */}
          <FieldBlock
            label="Street Address"
            name="street"
            placeholder="1 Sesame Street, Big Bird Building"
          />

          {/* Unit / Postal */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <FieldBlock
              labelNode={
                <div className="flex items-center justify-between">
                  <span>Unit / House Number</span>
                  <span className="text-sm text-slate-400">Optional</span>
                </div>
              }
              name="unit"
              placeholder="#12-34"
            />
            <FieldBlock
              label="Postal Code"
              name="postal"
              placeholder="123456"
            />
          </div>
        </MainLayout>
      )}
    </Formik>
  );
}

/* ---------- UI bits ---------- */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mb-8 text-3xl font-semibold text-slate-900">{children}</h1>
  );
}

function FieldBlock({
  label,
  labelNode,
  name,
  placeholder,
  type = "text",
}: {
  label?: string;
  labelNode?: React.ReactNode;
  name: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {labelNode ?? label}
      </label>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full h-11 rounded-xl md:h-[40px] md:rounded-[8px]
        border border-slate-300 bg-white px-3 text-[15px] text-slate-700
        placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-300`}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="mt-1 text-sm text-rose-600"
      />
    </div>
  );
}
