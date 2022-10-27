CREATE TABLE "product"(
    "product_id" serial,
    "title_product"  varchar(150) NOT NULL,
    "description" varchar(300),
    "price" varchar(50) NOT NULL,
    "available" boolean NOT NULL default true,
    "type_id" integer not null,
    CONSTRAINT "productPk" PRIMARY KEY ("product_id")
);

CREATE TABLE "type"(
    "type_id" serial,
    "title_type" varchar(150) not null,
    "category_id" integer not null,
    CONSTRAINT "typePk" PRIMARY KEY ("type_id")
);


CREATE TABLE "parameter"(
    "parameter_id" serial,
    "title_parameter" varchar(150) NOT NULL,
    "group" varchar(150) NOT NULL,
    CONSTRAINT "parameterPk" PRIMARY KEY ("parameter_id")
);

CREATE TABLE "default_parameter_values"(
    "default_parameter_value_id" serial,
    "default_parameter_value" varchar(150) NOT NULL,
    "parameter_id" integer not null,
    CONSTRAINT "default_parameter_valuePk" PRIMARY KEY ("default_parameter_value_id")
);

CREATE TABLE "product_parameter_values"(
    "product_parameter_value_id" serial,
    "product_parameter_value" varchar(150) NOT NULL,
    "parameter_id" integer not null,
    "product_id" integer not null,
    CONSTRAINT "product_parameter_valuesPk" PRIMARY KEY ("product_parameter_value_id")
);

CREATE TABLE "type_parameter"(
    "type_parameter_id" serial,
    "type_id" integer not null,
    "parameter_id" integer not null,
    CONSTRAINT "type_parameterPk" PRIMARY KEY ("type_parameter_id")
);

CREATE TABLE "category"(
    "category_id" serial,
    "title_category" varchar(150) not null,
    CONSTRAINT "categoryPk" PRIMARY KEY ("category_id")
);

CREATE TABLE "admin"(
    "admin_id" serial,
    "login" varchar(100) not null,
    "password" varchar(100) not null,
    "name" varchar(100) not null,
    "telephone" varchar(100) not null,
    "locality" varchar(255) not null,
    "locality_fias_id" varchar(50) not null,
    "tariff_code" varchar(20) not null,
    "delivery_point_sdek" varchar(100) not null,
    "delivery_point_code_sdek" varchar(100) not null,
    "delivery_point_pochta" varchar(100) not null,
    "delivery_point_code_pochta" varchar(100) not null,
    CONSTRAINT "adminPk" PRIMARY KEY ("admin_id")
);

CREATE TABLE "order"(
    "order_id" serial,
    "last_name" varchar(255) not null,
    "first_name" varchar(255) not null,
    "patronymic" varchar(255) not null,
    "telephone" varchar(255) not null,
    "feedback_URL" varchar(255) not null,
    "region" varchar(255) not null,
    "city" varchar(255) not null,
    "delivery_point" varchar(255) not null,
    "delivery_point_code" varchar(255) not null,
    "date" varchar(255) not null,
    "message"  varchar(1255),
    "cost_of_products" integer not null,
    "cost_of_delivery" integer not null,
    "delivery" varchar(255) not null,
    "confirmed" boolean not null default false,
    "weight" integer nOT NULL,
    "uuid" varchar(1255),
    CONSTRAINT "orderPk" PRIMARY KEY ("order_id")
);

CREATE TABLE "order_product"(
    "order_product_id" serial,
    "order_id" integer not null,
    "product_id" integer not null,
    "count" integer,
    CONSTRAINT "order_productPk" PRIMARY KEY ("order_product_id")
);

CREATE TABLE "order_product_parameter_values"(
    "order_product_parameter_value_id" serial,
    "order_product_id" integer not null,
    "order_product_parameter_value" varchar(150) NOT NULL,
    "title_parameter" varchar(255) not null,
    "order_id" integer,
    "group" varchar(150) NOT NULL,
    CONSTRAINT "order_product_parameter_valuesPk" PRIMARY KEY ("order_product_parameter_value_id")
);

-- ALTER TABLE ONLY public.default_parameter_values
--     ADD CONSTRAINT fk_default_parameter_values_parameter FOREIGN KEY (parameter_id) REFERENCES public.parameter(parameter_id);

-- ALTER TABLE ONLY public.order_product
--     ADD CONSTRAINT fk_order_product_order FOREIGN KEY (order_id) REFERENCES public."order"(order_id);

-- ALTER TABLE ONLY public.order_product_parameter_values
--     ADD CONSTRAINT fk_order_product_parameter_values_order FOREIGN KEY (order_id) REFERENCES public."order"(order_id);

-- ALTER TABLE ONLY public.order_product_parameter_values
--     ADD CONSTRAINT fk_order_product_parameter_values_order_product FOREIGN KEY (order_product_id) REFERENCES public.order_product(order_product_id);

-- ALTER TABLE ONLY public.order_product
--     ADD CONSTRAINT fk_order_product_product FOREIGN KEY (product_id) REFERENCES public.product(product_id);

-- ALTER TABLE ONLY public.product_parameter_values
--     ADD CONSTRAINT fk_product_parameter_values_parameter FOREIGN KEY (parameter_id) REFERENCES public.parameter(parameter_id);

-- ALTER TABLE ONLY public.product_parameter_values
--     ADD CONSTRAINT fk_product_parameter_values_product FOREIGN KEY (product_id) REFERENCES public.product(product_id);

-- ALTER TABLE ONLY public.product
--     ADD CONSTRAINT fk_product_type FOREIGN KEY (type_id) REFERENCES public.type(type_id);

-- ALTER TABLE ONLY public.type
--     ADD CONSTRAINT fk_type_category FOREIGN KEY (category_id) REFERENCES public.category(category_id);

-- ALTER TABLE ONLY public.type_parameter
--     ADD CONSTRAINT fk_type_parameter_parameter FOREIGN KEY (parameter_id) REFERENCES public.parameter(parameter_id);

-- ALTER TABLE ONLY public.type_parameter
--     ADD CONSTRAINT fk_type_parameter_type FOREIGN KEY (type_id) REFERENCES public.type(type_id);
