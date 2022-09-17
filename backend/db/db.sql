CREATE TABLE "Liquid"(
    "Id" serial,
    "Title" character varying(50) NOT NULL,
    "Description" character varying(200) NOT NULL,
    "Price" character varying(50) NOT NULL,
    "Krepost0" boolean default false NOT NULL,
    "Krepost1.5" boolean default false NOT NULL,
    "Krepost3" boolean default false NOT NULL,
    "Krepost4.5" boolean default false NOT NULL,
    "Krepost6" boolean default false NOT NULL,
    "Krepost9" boolean default false NOT NULL,
    "Krepost12" boolean default false NOT NULL,
    "Salt10" boolean default false NOT NULL,
    "Salt20" boolean default false NOT NULL,
    "Available" boolean NOT NULL default true,
    "TypeId" integer not null,
    "CategoryId" integer not null,
    CONSTRAINT "ProductPk" PRIMARY KEY ("Id")
);


CREATE TABLE "Type"(
    "Id" serial,
    "Title" character varying(100) not null,
    CONSTRAINT "TypePk" PRIMARY KEY ("Id")
);

CREATE TABLE "Category"(
    "Id" serial,
    "Title" character varying(100) not null,
    CONSTRAINT "CategoryPk" PRIMARY KEY ("Id")
);

CREATE TABLE "Admin"(
    "Id" serial,
    "Login" character varying(100) not null,
    "Password" character varying(100) not null,
    CONSTRAINT "AdminPk" PRIMARY KEY ("Id")
);

