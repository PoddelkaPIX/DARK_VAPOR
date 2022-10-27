--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7
-- Dumped by pg_dump version 13.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    admin_id integer NOT NULL,
    login character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    locality character varying(255),
    fias_id character varying(50),
    tariff_code character varying(20)
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: admin_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_admin_id_seq OWNER TO postgres;

--
-- Name: admin_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_admin_id_seq OWNED BY public.admin.admin_id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    category_id integer NOT NULL,
    title_category character varying(150) NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_category_id_seq OWNER TO postgres;

--
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;


--
-- Name: default_parameter_values; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.default_parameter_values (
    default_parameter_value_id integer NOT NULL,
    default_parameter_value character varying(150) NOT NULL,
    parameter_id integer NOT NULL
);


ALTER TABLE public.default_parameter_values OWNER TO postgres;

--
-- Name: default_parameter_values_default_parameter_value_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.default_parameter_values_default_parameter_value_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.default_parameter_values_default_parameter_value_id_seq OWNER TO postgres;

--
-- Name: default_parameter_values_default_parameter_value_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.default_parameter_values_default_parameter_value_id_seq OWNED BY public.default_parameter_values.default_parameter_value_id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    order_id integer NOT NULL,
    last_name character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    patronymic character varying(255) NOT NULL,
    telephone character varying(255) NOT NULL,
    feedback_url character varying(255) NOT NULL,
    region character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    deliverypoint character varying(255) NOT NULL,
    date character varying(255) NOT NULL,
    message character varying(1255),
    cost_of_products integer NOT NULL,
    cost_of_delivery integer NOT NULL,
    delivery character varying(255) NOT NULL,
    confirmed boolean DEFAULT false NOT NULL
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Name: order_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_order_id_seq OWNER TO postgres;

--
-- Name: order_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_order_id_seq OWNED BY public."order".order_id;


--
-- Name: order_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_product (
    order_product_id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    count integer
);


ALTER TABLE public.order_product OWNER TO postgres;

--
-- Name: order_product_order_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_product_order_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_product_order_product_id_seq OWNER TO postgres;

--
-- Name: order_product_order_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_product_order_product_id_seq OWNED BY public.order_product.order_product_id;


--
-- Name: order_product_parameter_values; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_product_parameter_values (
    order_product_parameter_value_id integer NOT NULL,
    order_product_id integer NOT NULL,
    order_product_parameter_value character varying(150) NOT NULL,
    title_parameter character varying(255) NOT NULL,
    order_id integer NOT NULL,
    "group" character varying(150) NOT NULL
);


ALTER TABLE public.order_product_parameter_values OWNER TO postgres;

--
-- Name: order_product_parameter_value_order_product_parameter_value_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_product_parameter_value_order_product_parameter_value_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_product_parameter_value_order_product_parameter_value_seq OWNER TO postgres;

--
-- Name: order_product_parameter_value_order_product_parameter_value_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_product_parameter_value_order_product_parameter_value_seq OWNED BY public.order_product_parameter_values.order_product_parameter_value_id;


--
-- Name: parameter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parameter (
    parameter_id integer NOT NULL,
    title_parameter character varying(150) NOT NULL,
    "group" character varying(150) NOT NULL
);


ALTER TABLE public.parameter OWNER TO postgres;

--
-- Name: parameter_parameter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parameter_parameter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parameter_parameter_id_seq OWNER TO postgres;

--
-- Name: parameter_parameter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parameter_parameter_id_seq OWNED BY public.parameter.parameter_id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    product_id integer NOT NULL,
    title_product character varying(150) NOT NULL,
    description character varying(300),
    price character varying(50) NOT NULL,
    available boolean DEFAULT true NOT NULL,
    type_id integer NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_parameter_values; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_parameter_values (
    product_parameter_value_id integer NOT NULL,
    product_parameter_value character varying(150) NOT NULL,
    parameter_id integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.product_parameter_values OWNER TO postgres;

--
-- Name: product_parameter_values_product_parameter_value_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_parameter_values_product_parameter_value_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_parameter_values_product_parameter_value_id_seq OWNER TO postgres;

--
-- Name: product_parameter_values_product_parameter_value_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_parameter_values_product_parameter_value_id_seq OWNED BY public.product_parameter_values.product_parameter_value_id;


--
-- Name: product_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_product_id_seq OWNER TO postgres;

--
-- Name: product_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_product_id_seq OWNED BY public.product.product_id;


--
-- Name: type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type (
    type_id integer NOT NULL,
    title_type character varying(150) NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.type OWNER TO postgres;

--
-- Name: type_parameter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_parameter (
    type_parameter_id integer NOT NULL,
    type_id integer NOT NULL,
    parameter_id integer NOT NULL
);


ALTER TABLE public.type_parameter OWNER TO postgres;

--
-- Name: type_parameter_type_parameter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_parameter_type_parameter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.type_parameter_type_parameter_id_seq OWNER TO postgres;

--
-- Name: type_parameter_type_parameter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_parameter_type_parameter_id_seq OWNED BY public.type_parameter.type_parameter_id;


--
-- Name: type_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.type_type_id_seq OWNER TO postgres;

--
-- Name: type_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_type_id_seq OWNED BY public.type.type_id;


--
-- Name: admin admin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN admin_id SET DEFAULT nextval('public.admin_admin_id_seq'::regclass);


--
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- Name: default_parameter_values default_parameter_value_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.default_parameter_values ALTER COLUMN default_parameter_value_id SET DEFAULT nextval('public.default_parameter_values_default_parameter_value_id_seq'::regclass);


--
-- Name: order order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order" ALTER COLUMN order_id SET DEFAULT nextval('public.order_order_id_seq'::regclass);


--
-- Name: order_product order_product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product ALTER COLUMN order_product_id SET DEFAULT nextval('public.order_product_order_product_id_seq'::regclass);


--
-- Name: order_product_parameter_values order_product_parameter_value_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product_parameter_values ALTER COLUMN order_product_parameter_value_id SET DEFAULT nextval('public.order_product_parameter_value_order_product_parameter_value_seq'::regclass);


--
-- Name: parameter parameter_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parameter ALTER COLUMN parameter_id SET DEFAULT nextval('public.parameter_parameter_id_seq'::regclass);


--
-- Name: product product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN product_id SET DEFAULT nextval('public.product_product_id_seq'::regclass);


--
-- Name: product_parameter_values product_parameter_value_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_parameter_values ALTER COLUMN product_parameter_value_id SET DEFAULT nextval('public.product_parameter_values_product_parameter_value_id_seq'::regclass);


--
-- Name: type type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type ALTER COLUMN type_id SET DEFAULT nextval('public.type_type_id_seq'::regclass);


--
-- Name: type_parameter type_parameter_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_parameter ALTER COLUMN type_parameter_id SET DEFAULT nextval('public.type_parameter_type_parameter_id_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admin (admin_id, login, password, locality, fias_id, tariff_code) VALUES (1, 'vapor', '1134481834', 'Г. Курган', '3bbda77d-ba3f-4457-9d44-c440815cda89', '136');


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category (category_id, title_category) VALUES (1, 'Жидкости');
INSERT INTO public.category (category_id, title_category) VALUES (2, 'Вата и койлы');
INSERT INTO public.category (category_id, title_category) VALUES (3, 'Мерч');


--
-- Data for Name: default_parameter_values; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (1, '0', 1);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (2, '1.5', 1);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (3, '3', 1);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (4, '4.5', 1);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (5, '6', 1);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (6, '9', 1);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (7, '12', 1);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (8, '10', 2);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (9, '20', 2);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (10, 'Сталь', 3);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (11, 'Кантал', 3);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (12, 'Нихром', 3);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (13, '0.06', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (14, '0.08', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (15, '0.1', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (16, '0.12', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (17, '0.15', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (18, '0.2', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (19, '0.3', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (20, '0.35', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (21, '0.4', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (22, '0.45', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (23, '0.5', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (24, '0.55', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (25, '0.6', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (26, '0.65', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (27, '0.7', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (28, '0.9', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (29, '1', 4);
INSERT INTO public.default_parameter_values (default_parameter_value_id, default_parameter_value, parameter_id) VALUES (30, '1.2', 4);


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."order" (order_id, last_name, first_name, patronymic, telephone, feedback_url, region, city, deliverypoint, date, message, cost_of_products, cost_of_delivery, delivery, confirmed) VALUES (2, 'Быков', 'Глеб', 'Иванов', '+78909353636', '4444', 'г Москва', 'г Москва', 'Не указан', '19.10.2022, 14:59:20', '', 2500, 210, 'СДЭК', false);
INSERT INTO public."order" (order_id, last_name, first_name, patronymic, telephone, feedback_url, region, city, deliverypoint, date, message, cost_of_products, cost_of_delivery, delivery, confirmed) VALUES (3, 'Морошка', 'Никита', 'Никитич', '4555', '4444', 'Московская обл', 'г Химки', 'На Строителей 4В', '19.10.2022, 15:32:18', '', 7500, 265, 'СДЭК', false);
INSERT INTO public."order" (order_id, last_name, first_name, patronymic, telephone, feedback_url, region, city, deliverypoint, date, message, cost_of_products, cost_of_delivery, delivery, confirmed) VALUES (5, 'Морошка', 'Никита', 'Никитич', '4555', '333', 'г Москва', 'г Москва', 'MSK310', '19.10.2022, 18:57:47', '', 2500, 210, 'СДЭК', false);
INSERT INTO public."order" (order_id, last_name, first_name, patronymic, telephone, feedback_url, region, city, deliverypoint, date, message, cost_of_products, cost_of_delivery, delivery, confirmed) VALUES (4, 'Быков', 'Глеб', 'Иванов', '+78909353636', 'вв', 'г Москва', 'г Москва', '6149 Постамат ОМНИСДЭК', '19.10.2022, 15:56:07', '', 2500, 210, 'СДЭК', true);


--
-- Data for Name: order_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.order_product (order_product_id, order_id, product_id, count) VALUES (2, 2, 3, 1);
INSERT INTO public.order_product (order_product_id, order_id, product_id, count) VALUES (3, 3, 3, 1);
INSERT INTO public.order_product (order_product_id, order_id, product_id, count) VALUES (4, 3, 3, 1);
INSERT INTO public.order_product (order_product_id, order_id, product_id, count) VALUES (5, 3, 3, 1);
INSERT INTO public.order_product (order_product_id, order_id, product_id, count) VALUES (6, 4, 3, 1);
INSERT INTO public.order_product (order_product_id, order_id, product_id, count) VALUES (7, 5, 3, 1);


--
-- Data for Name: order_product_parameter_values; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: parameter; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.parameter (parameter_id, title_parameter, "group") VALUES (1, 'Никотин(Щёлочь)', 'nicotine');
INSERT INTO public.parameter (parameter_id, title_parameter, "group") VALUES (2, 'Никотин(Соль)', 'nicotine');
INSERT INTO public.parameter (parameter_id, title_parameter, "group") VALUES (3, 'Материал', 'material');
INSERT INTO public.parameter (parameter_id, title_parameter, "group") VALUES (4, 'Сопротивление', 'resistance');


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product (product_id, title_product, description, price, available, type_id) VALUES (1, 'TASTY', 'Клубничный джем с классическим кофе и ирисом', '2050', true, 1);
INSERT INTO public.product (product_id, title_product, description, price, available, type_id) VALUES (2, 'TOXIC', 'Яблочный джем', '2400', true, 1);
INSERT INTO public.product (product_id, title_product, description, price, available, type_id) VALUES (3, 'POWER', 'Сила земли', '2500', true, 2);
INSERT INTO public.product (product_id, title_product, description, price, available, type_id) VALUES (4, 'Лёгкая вата', NULL, '200', true, 3);
INSERT INTO public.product (product_id, title_product, description, price, available, type_id) VALUES (5, 'Тяжёлая вата', NULL, '300', true, 3);
INSERT INTO public.product (product_id, title_product, description, price, available, type_id) VALUES (6, 'Lanscov coil', 'Америка wireoptim нихром ni80', '2300', true, 4);


--
-- Data for Name: product_parameter_values; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.type (type_id, title_type, category_id) VALUES (1, 'TAX FREE TOBACCO', 1);
INSERT INTO public.type (type_id, title_type, category_id) VALUES (2, 'LE ELIXIR', 1);
INSERT INTO public.type (type_id, title_type, category_id) VALUES (3, 'Вата', 2);
INSERT INTO public.type (type_id, title_type, category_id) VALUES (4, 'Коилы', 2);


--
-- Data for Name: type_parameter; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.type_parameter (type_parameter_id, type_id, parameter_id) VALUES (1, 1, 1);
INSERT INTO public.type_parameter (type_parameter_id, type_id, parameter_id) VALUES (2, 1, 2);
INSERT INTO public.type_parameter (type_parameter_id, type_id, parameter_id) VALUES (3, 3, 3);
INSERT INTO public.type_parameter (type_parameter_id, type_id, parameter_id) VALUES (4, 4, 3);
INSERT INTO public.type_parameter (type_parameter_id, type_id, parameter_id) VALUES (5, 4, 4);


--
-- Name: admin_admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_admin_id_seq', 1, true);


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_category_id_seq', 3, true);


--
-- Name: default_parameter_values_default_parameter_value_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.default_parameter_values_default_parameter_value_id_seq', 30, true);


--
-- Name: order_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_order_id_seq', 5, true);


--
-- Name: order_product_order_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_product_order_product_id_seq', 7, true);


--
-- Name: order_product_parameter_value_order_product_parameter_value_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_product_parameter_value_order_product_parameter_value_seq', 1, false);


--
-- Name: parameter_parameter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parameter_parameter_id_seq', 4, true);


--
-- Name: product_parameter_values_product_parameter_value_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_parameter_values_product_parameter_value_id_seq', 1, false);


--
-- Name: product_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_product_id_seq', 7, true);


--
-- Name: type_parameter_type_parameter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_parameter_type_parameter_id_seq', 5, true);


--
-- Name: type_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_type_id_seq', 5, true);


--
-- Name: admin adminPk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT "adminPk" PRIMARY KEY (admin_id);


--
-- Name: category categoryPk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "categoryPk" PRIMARY KEY (category_id);


--
-- Name: default_parameter_values default_parameter_valuePk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.default_parameter_values
    ADD CONSTRAINT "default_parameter_valuePk" PRIMARY KEY (default_parameter_value_id);


--
-- Name: order orderPk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "orderPk" PRIMARY KEY (order_id);


--
-- Name: order_product order_productPk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT "order_productPk" PRIMARY KEY (order_product_id);


--
-- Name: order_product_parameter_values order_product_parameter_valuesPk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product_parameter_values
    ADD CONSTRAINT "order_product_parameter_valuesPk" PRIMARY KEY (order_product_parameter_value_id);


--
-- Name: parameter parameterPk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parameter
    ADD CONSTRAINT "parameterPk" PRIMARY KEY (parameter_id);


--
-- Name: product productPk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "productPk" PRIMARY KEY (product_id);


--
-- Name: product_parameter_values product_parameter_valuesPk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_parameter_values
    ADD CONSTRAINT "product_parameter_valuesPk" PRIMARY KEY (product_parameter_value_id);


--
-- Name: type typePk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type
    ADD CONSTRAINT "typePk" PRIMARY KEY (type_id);


--
-- Name: type_parameter type_parameterPk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_parameter
    ADD CONSTRAINT "type_parameterPk" PRIMARY KEY (type_parameter_id);


--
-- Name: default_parameter_values fk_default_parameter_values_parameter; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.default_parameter_values
    ADD CONSTRAINT fk_default_parameter_values_parameter FOREIGN KEY (parameter_id) REFERENCES public.parameter(parameter_id);


--
-- Name: order_product fk_order_product_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT fk_order_product_order FOREIGN KEY (order_id) REFERENCES public."order"(order_id);


--
-- Name: order_product_parameter_values fk_order_product_parameter_values_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product_parameter_values
    ADD CONSTRAINT fk_order_product_parameter_values_order FOREIGN KEY (order_id) REFERENCES public."order"(order_id);


--
-- Name: order_product_parameter_values fk_order_product_parameter_values_order_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product_parameter_values
    ADD CONSTRAINT fk_order_product_parameter_values_order_product FOREIGN KEY (order_product_id) REFERENCES public.order_product(order_product_id);


--
-- Name: order_product fk_order_product_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT fk_order_product_product FOREIGN KEY (product_id) REFERENCES public.product(product_id);


--
-- Name: product_parameter_values fk_product_parameter_values_parameter; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_parameter_values
    ADD CONSTRAINT fk_product_parameter_values_parameter FOREIGN KEY (parameter_id) REFERENCES public.parameter(parameter_id);


--
-- Name: product_parameter_values fk_product_parameter_values_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_parameter_values
    ADD CONSTRAINT fk_product_parameter_values_product FOREIGN KEY (product_id) REFERENCES public.product(product_id);


--
-- Name: product fk_product_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk_product_type FOREIGN KEY (type_id) REFERENCES public.type(type_id);


--
-- Name: type fk_type_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type
    ADD CONSTRAINT fk_type_category FOREIGN KEY (category_id) REFERENCES public.category(category_id);


--
-- Name: type_parameter fk_type_parameter_parameter; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_parameter
    ADD CONSTRAINT fk_type_parameter_parameter FOREIGN KEY (parameter_id) REFERENCES public.parameter(parameter_id);


--
-- Name: type_parameter fk_type_parameter_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_parameter
    ADD CONSTRAINT fk_type_parameter_type FOREIGN KEY (type_id) REFERENCES public.type(type_id);


--
-- PostgreSQL database dump complete
--

