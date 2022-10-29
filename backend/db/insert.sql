INSERT INTO public."category" ("title_category") VALUES ('Жидкости');
INSERT INTO public."category" ("title_category") VALUES ('Вата и койлы');
INSERT INTO public."category" ("title_category") VALUES ('Мерч');

INSERT INTO public."type" ("title_type", "category_id") VALUES ('TAX FREE TOBACCO', 1);
INSERT INTO public."type" ("title_type", "category_id") VALUES ('LE ELIXIR', 1);
INSERT INTO public."type" ("title_type", "category_id") VALUES ('Вата', 2);
INSERT INTO public."type" ("title_type", "category_id") VALUES ('Коилы', 2);
INSERT INTO public."type" ("title_type", "category_id") VALUES ('Шапки', 3);

INSERT INTO public."parameter" ("title_parameter", "group") VALUES ('Никотин(Щёлочь)', 'nicotine');
INSERT INTO public."parameter" ("title_parameter", "group") VALUES ('Никотин(Соль)', 'nicotine');
INSERT INTO public."parameter" ("title_parameter", "group") VALUES ('Материал', 'material');
INSERT INTO public."parameter" ("title_parameter", "group") VALUES ('Сопротивление', 'resistance'); 


INSERT INTO public."type_parameter" ("type_id", "parameter_id") VALUES (1, 1);
INSERT INTO public."type_parameter" ("type_id", "parameter_id") VALUES (1, 2);
INSERT INTO public."type_parameter" ("type_id", "parameter_id") VALUES (3, 3);
INSERT INTO public."type_parameter" ("type_id", "parameter_id") VALUES (4, 3);
INSERT INTO public."type_parameter" ("type_id", "parameter_id") VALUES (4, 4);

INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (1, '0');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (1, '1.5');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (1, '3');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (1, '4.5');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (1, '6');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (1, '9');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (1, '12');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (2, '20');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (2, '20 hard');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (3, 'Сталь');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (3, 'Кантал');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (3, 'Нихром');

INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.06');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.08');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.1');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.12');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.15');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.2');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.3');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.35');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.4');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.45');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.5');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.55');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.6');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.65');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.7');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '0.9');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '1');
INSERT INTO public."default_parameter_values" ("parameter_id", "default_parameter_value") VALUES (4, '1.2');
 
INSERT INTO public."product" (
    "title_product", 
    "description", 
    "price", 
    "available", 
    "type_id") 
VALUES (
    'TASTY', 
    'Клубничный джем с классическим кофе и ирисом',
    '2050',
    true,
    1
);

INSERT INTO public."product" (
    "title_product", 
    "description", 
    "price", 
    "available", 
    "type_id") 
VALUES (
    'TOXIC', 
    'Яблочный джем',
    '2400',
    true,
    1
);

INSERT INTO public."product" (
    "title_product", 
    "description", 
    "price", 
    "available", 
    "type_id") 
VALUES (
    'POWER', 
    'Сила земли',
    '2500',
    true,
    2
);


INSERT INTO public."product" (
    "title_product", 
    "description", 
    "price", 
    "available", 
    "type_id") 
VALUES (
    'Лёгкая вата', 
    null,
    '200',
    true,
    3
);

INSERT INTO public."product" (
    "title_product", 
    "description", 
    "price", 
    "available", 
    "type_id") 
VALUES (
    'Тяжёлая вата', 
    null,
    '300',
    true,
    3
);

INSERT INTO public."product" (
    "title_product", 
    "description", 
    "price", 
    "available", 
    "type_id") 
VALUES (
    'Lanscov coil', 
    'Америка wireoptim нихром ni80',
    '2300',
    true,
    4
);

INSERT INTO public."admin" ("login", "password", "name" , "locality", "locality_fias_id", "tariff_code", "telephone", "delivery_point_sdek", "delivery_point_code_sdek", "delivery_point_pochta", "delivery_point_code_pochta") 
VALUES ('vapor', '1134481834', 'Москоленко Максим Сергеевич' , 'Г. Курган','3bbda77d-ba3f-4457-9d44-c440815cda89', '136', '89924566831', 'Надпись по  умолчанию', 'MSK67', 'Пока не важно', 'Пока не важно');