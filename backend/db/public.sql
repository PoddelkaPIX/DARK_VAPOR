CREATE TABLE  public."Organization"
(
    "Id" serial NOT NULL,
    "Title" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "Password" character varying(60) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(256) COLLATE pg_catalog."default",
    "EmailNotifications" boolean DEFAULT false,
    "Key" character varying(6) COLLATE pg_catalog."default" NOT NULL,
    "UserLimit" integer NOT NULL DEFAULT 1,
    "Statistics" boolean DEFAULT false,
    "ProtectionCheating" boolean DEFAULT false,
    "Date" date NOT NULL,
    "Time" time without time zone NOT NULL,
    "ThemeId" smallint DEFAULT 1,
    CONSTRAINT "OrganizationPk" PRIMARY KEY ("Id")
);

CREATE TABLE  public."Theme"
(
    "Id" serial NOT NULL,
    "Title" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "ThemePk" PRIMARY KEY ("Id")
);

CREATE TABLE  public."Payment"
(
    "Number" integer NOT NULL,
    "Money" integer NOT NULL,
    "Date" date NOT NULL,
    "Time" time without time zone NOT NULL,
    "Users" integer NOT NULL DEFAULT 1000,
    "Statistics" boolean DEFAULT false,
    "ProtectionCheating" boolean DEFAULT false,
    "OrganizationId" bigint NOT NULL,
    CONSTRAINT "PaymentPk" PRIMARY KEY ("Number")
);

CREATE TABLE  public."DeadLine"
(
    "Id" serial NOT NULL,
    "Date" date NOT NULL,
    "Time" time without time zone NOT NULL,
    "OrganizationId" bigint NOT NULL,
    CONSTRAINT "DeadLinePk" PRIMARY KEY ("Id")
);

CREATE TABLE IF NOT EXISTS public."Session"(
    "Id" serial NOT NULL,
    "UserId" bigint NOT NULL,
    "IpAddress" character varying(20) NOT NULL,
    "BackendStartDateTime" timestamp without time zone NOT NULL,
    "StateChangeDateTime" timestamp without time zone NOT NULL,
    "StateId" smallint NOT NULL,
    CONSTRAINT "SessionPk" PRIMARY KEY ("Id")
);

CREATE TABLE IF NOT EXISTS public."State"(
    "Id" serial NOT NULL,
    "Title" character varying(20) NOT NULL,
    CONSTRAINT "StatePk" PRIMARY KEY ("Id")
);

--  ///////////////////////////// Связи

ALTER TABLE  public."Organization"
    ADD CONSTRAINT "OrganizationTheme" FOREIGN KEY ("ThemeId")
    REFERENCES public."Theme" ("Id") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE  public."DeadLine"
    ADD CONSTRAINT "DeadLineOrganization" FOREIGN KEY ("OrganizationId")
    REFERENCES public."Organization" ("Id") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE  public."Payment"
    ADD CONSTRAINT "PaymentOrganization" FOREIGN KEY ("OrganizationId")
    REFERENCES public."Organization" ("Id") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE IF EXISTS public."Session"
    ADD CONSTRAINT "SessionState" FOREIGN KEY ("StateId")
    REFERENCES public."State" ("Id") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

--///////////////////////// Данные

INSERT INTO public."Theme" ("Title") VALUES ('blue-theme');
INSERT INTO public."Theme" ("Title") VALUES ('red-theme');

INSERT INTO public."Organization" (
    "Title", 
    "Password", 
    "Email",  
    "EmailNotifications", 
    "Key",
    "UserLimit",
    "Statistics",
    "ProtectionCheating",
    "Date",
    "Time",
    "ThemeId"
    ) VALUES ('КТК', 'password', 'KTK@mail.ru', false, 'fwe4ew', 1000, true, true, '2022-08-26', '12:00', 1);
INSERT INTO public."Organization" (
    "Title", 
    "Password", 
    "Email",  
    "EmailNotifications", 
    "Key",
    "UserLimit",
    "Statistics",
    "ProtectionCheating",
    "Date",
    "Time",
    "ThemeId"
    ) VALUES ('КГК', 'passwordKGK', 'KGK@list.ru', true, 'kd3hd1', 1, false, false, '2022-03-06', '10:16', 2);


INSERT INTO public."State" ("Title") VALUES ('active');
INSERT INTO public."State" ("Title") VALUES ('idle');
INSERT INTO public."State" ("Title") VALUES ('disabled');

INSERT INTO public."Session" ("UserId", "IpAddress", "BackendStartDateTime", "StateChangeDateTime", "StateId") 
                      VALUES (1, '192.168.20.41', '2022-03-27', '2022-03-28', 3);
INSERT INTO public."Session" ("UserId", "IpAddress", "BackendStartDateTime", "StateChangeDateTime", "StateId") 
                      VALUES (2, '192.168.25.82', '2022-03-27', '2022-03-27', 2);
INSERT INTO public."Session" ("UserId", "IpAddress", "BackendStartDateTime", "StateChangeDateTime", "StateId") 
                      VALUES (3, '192.168.62.62', '2022-03-27', '2022-03-27', 1);
INSERT INTO public."Session" ("UserId", "IpAddress", "BackendStartDateTime", "StateChangeDateTime", "StateId") 
                      VALUES (4, '192.168.46.12', '2022-03-25', '2022-03-28', 2);
INSERT INTO public."Session" ("UserId", "IpAddress", "BackendStartDateTime", "StateChangeDateTime", "StateId") 
                      VALUES (5, '192.168.82.62', '2022-03-26', '2022-03-27', 3);
