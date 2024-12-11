--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4 (Homebrew)

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

--
-- Name: Gender; Type: TYPE; Schema: public; Owner: KitaCore_owner
--

CREATE TYPE public."Gender" AS ENUM (
    'MALE',
    'FEMALE',
    'OTHER'
);


ALTER TYPE public."Gender" OWNER TO "KitaCore_owner";

--
-- Name: ResourceType; Type: TYPE; Schema: public; Owner: KitaCore_owner
--

CREATE TYPE public."ResourceType" AS ENUM (
    'SLIDE_DECK',
    'ARTICLE',
    'VIDEO',
    'OTHER'
);


ALTER TYPE public."ResourceType" OWNER TO "KitaCore_owner";

--
-- Name: Role; Type: TYPE; Schema: public; Owner: KitaCore_owner
--

CREATE TYPE public."Role" AS ENUM (
    'STUDENT',
    'PROFESSOR'
);


ALTER TYPE public."Role" OWNER TO "KitaCore_owner";

--
-- Name: SemeesterEnum; Type: TYPE; Schema: public; Owner: KitaCore_owner
--

CREATE TYPE public."SemeesterEnum" AS ENUM (
    'FALL',
    'WINTER',
    'SPRING',
    'SUMMER'
);


ALTER TYPE public."SemeesterEnum" OWNER TO "KitaCore_owner";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Announcement; Type: TABLE; Schema: public; Owner: KitaCore_owner
--

CREATE TABLE public."Announcement" (
    id text NOT NULL,
    "classId" text NOT NULL,
    "userId" text NOT NULL,
    title character varying(255) NOT NULL,
    content character varying(255) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Announcement" OWNER TO "KitaCore_owner";

--
-- Name: Assignment; Type: TABLE; Schema: public; Owner: KitaCore_owner
--

CREATE TABLE public."Assignment" (
    id text NOT NULL,
    "classId" text NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255),
    "dueDate" timestamp(3) without time zone NOT NULL,
    "totalPoints" double precision NOT NULL,
    "isUploded" boolean DEFAULT false NOT NULL,
    url character varying(255),
    "isGraded" boolean DEFAULT false NOT NULL,
    "isPubished" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Assignment" OWNER TO "KitaCore_owner";

--
-- Name: Class; Type: TABLE; Schema: public; Owner: KitaCore_owner
--

CREATE TABLE public."Class" (
    id text NOT NULL,
    "universityId" text NOT NULL,
    "className" character varying(255) NOT NULL,
    descripton character varying(255),
    code integer NOT NULL,
    semester public."SemeesterEnum" NOT NULL,
    year integer NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Class" OWNER TO "KitaCore_owner";

--
-- Name: ClassEnrollment; Type: TABLE; Schema: public; Owner: KitaCore_owner
--

CREATE TABLE public."ClassEnrollment" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "classId" text NOT NULL,
    role public."Role" NOT NULL
);


ALTER TABLE public."ClassEnrollment" OWNER TO "KitaCore_owner";

--
-- Name: Grade; Type: TABLE; Schema: public; Owner: KitaCore_owner
--

CREATE TABLE public."Grade" (
    id text NOT NULL,
    "assignmentId" text NOT NULL,
    "studentId" text NOT NULL,
    score double precision NOT NULL,
    "gradedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "feedBack" character varying(255)
);


ALTER TABLE public."Grade" OWNER TO "KitaCore_owner";

--
-- Name: Message; Type: TABLE; Schema: public; Owner: KitaCore_owner
--

CREATE TABLE public."Message" (
    id text NOT NULL,
    "classId" text NOT NULL,
    "userId" text NOT NULL,
    "parentMessageId" text,
    title character varying(255),
    content character varying(255) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Message" OWNER TO "KitaCore_owner";

--
-- Name: Resource; Type: TABLE; Schema: public; Owner: KitaCore_owner
--

CREATE TABLE public."Resource" (
    id text NOT NULL,
    "classId" text,
    "assignmentId" text,
    "userId" text,
    title character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    "uploaedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type public."ResourceType" NOT NULL
);


ALTER TABLE public."Resource" OWNER TO "KitaCore_owner";

--
-- Name: Tag; Type: TABLE; Schema: public; Owner: KitaCore_owner
--

CREATE TABLE public."Tag" (
    id text NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public."Tag" OWNER TO "KitaCore_owner";

--
-- Name: University; Type: TABLE; Schema: public; Owner: KitaCore_owner
--

CREATE TABLE public."University" (
    id text NOT NULL,
    name character varying(255) NOT NULL,
    country character varying(255) NOT NULL,
    state character varying(255) NOT NULL,
    city character varying(255) NOT NULL
);


ALTER TABLE public."University" OWNER TO "KitaCore_owner";

--
-- Name: User; Type: TABLE; Schema: public; Owner: KitaCore_owner
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "universityId" text NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    bio character varying(255),
    role public."Role" NOT NULL,
    prefix character varying(255),
    "profilePicture" character varying(255),
    "phoneNumber" character varying(255),
    email character varying(255),
    "schoolEmail" character varying(255) NOT NULL,
    gender public."Gender",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "dataSharingOptIn" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."User" OWNER TO "KitaCore_owner";

--
-- Name: _TagsOnMessages; Type: TABLE; Schema: public; Owner: KitaCore_owner
--

CREATE TABLE public."_TagsOnMessages" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_TagsOnMessages" OWNER TO "KitaCore_owner";

--
-- Name: _TagsOnResources; Type: TABLE; Schema: public; Owner: KitaCore_owner
--

CREATE TABLE public."_TagsOnResources" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_TagsOnResources" OWNER TO "KitaCore_owner";

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: KitaCore_owner
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO "KitaCore_owner";

--
-- Name: Announcement Announcement_pkey; Type: CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Announcement"
    ADD CONSTRAINT "Announcement_pkey" PRIMARY KEY (id);


--
-- Name: Assignment Assignment_pkey; Type: CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Assignment"
    ADD CONSTRAINT "Assignment_pkey" PRIMARY KEY (id);


--
-- Name: ClassEnrollment ClassEnrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."ClassEnrollment"
    ADD CONSTRAINT "ClassEnrollment_pkey" PRIMARY KEY (id);


--
-- Name: Class Class_pkey; Type: CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Class"
    ADD CONSTRAINT "Class_pkey" PRIMARY KEY (id);


--
-- Name: Grade Grade_pkey; Type: CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Grade"
    ADD CONSTRAINT "Grade_pkey" PRIMARY KEY (id);


--
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- Name: Resource Resource_pkey; Type: CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: University University_pkey; Type: CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."University"
    ADD CONSTRAINT "University_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: ClassEnrollment_userId_classId_key; Type: INDEX; Schema: public; Owner: KitaCore_owner
--

CREATE UNIQUE INDEX "ClassEnrollment_userId_classId_key" ON public."ClassEnrollment" USING btree ("userId", "classId");


--
-- Name: Tag_name_key; Type: INDEX; Schema: public; Owner: KitaCore_owner
--

CREATE UNIQUE INDEX "Tag_name_key" ON public."Tag" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: KitaCore_owner
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_phoneNumber_key; Type: INDEX; Schema: public; Owner: KitaCore_owner
--

CREATE UNIQUE INDEX "User_phoneNumber_key" ON public."User" USING btree ("phoneNumber");


--
-- Name: User_schoolEmail_key; Type: INDEX; Schema: public; Owner: KitaCore_owner
--

CREATE UNIQUE INDEX "User_schoolEmail_key" ON public."User" USING btree ("schoolEmail");


--
-- Name: _TagsOnMessages_AB_unique; Type: INDEX; Schema: public; Owner: KitaCore_owner
--

CREATE UNIQUE INDEX "_TagsOnMessages_AB_unique" ON public."_TagsOnMessages" USING btree ("A", "B");


--
-- Name: _TagsOnMessages_B_index; Type: INDEX; Schema: public; Owner: KitaCore_owner
--

CREATE INDEX "_TagsOnMessages_B_index" ON public."_TagsOnMessages" USING btree ("B");


--
-- Name: _TagsOnResources_AB_unique; Type: INDEX; Schema: public; Owner: KitaCore_owner
--

CREATE UNIQUE INDEX "_TagsOnResources_AB_unique" ON public."_TagsOnResources" USING btree ("A", "B");


--
-- Name: _TagsOnResources_B_index; Type: INDEX; Schema: public; Owner: KitaCore_owner
--

CREATE INDEX "_TagsOnResources_B_index" ON public."_TagsOnResources" USING btree ("B");


--
-- Name: Announcement Announcement_classId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Announcement"
    ADD CONSTRAINT "Announcement_classId_fkey" FOREIGN KEY ("classId") REFERENCES public."Class"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Announcement Announcement_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Announcement"
    ADD CONSTRAINT "Announcement_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Assignment Assignment_classId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Assignment"
    ADD CONSTRAINT "Assignment_classId_fkey" FOREIGN KEY ("classId") REFERENCES public."Class"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ClassEnrollment ClassEnrollment_classId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."ClassEnrollment"
    ADD CONSTRAINT "ClassEnrollment_classId_fkey" FOREIGN KEY ("classId") REFERENCES public."Class"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ClassEnrollment ClassEnrollment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."ClassEnrollment"
    ADD CONSTRAINT "ClassEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Class Class_universityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Class"
    ADD CONSTRAINT "Class_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES public."University"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Grade Grade_assignmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Grade"
    ADD CONSTRAINT "Grade_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES public."Assignment"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Grade Grade_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Grade"
    ADD CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Message Message_classId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_classId_fkey" FOREIGN KEY ("classId") REFERENCES public."Class"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Message Message_parentMessageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_parentMessageId_fkey" FOREIGN KEY ("parentMessageId") REFERENCES public."Message"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Message Message_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Resource Resource_assignmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES public."Assignment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Resource Resource_classId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_classId_fkey" FOREIGN KEY ("classId") REFERENCES public."Class"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Resource Resource_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: User User_universityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES public."University"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _TagsOnMessages _TagsOnMessages_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."_TagsOnMessages"
    ADD CONSTRAINT "_TagsOnMessages_A_fkey" FOREIGN KEY ("A") REFERENCES public."Message"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _TagsOnMessages _TagsOnMessages_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."_TagsOnMessages"
    ADD CONSTRAINT "_TagsOnMessages_B_fkey" FOREIGN KEY ("B") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _TagsOnResources _TagsOnResources_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."_TagsOnResources"
    ADD CONSTRAINT "_TagsOnResources_A_fkey" FOREIGN KEY ("A") REFERENCES public."Resource"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _TagsOnResources _TagsOnResources_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KitaCore_owner
--

ALTER TABLE ONLY public."_TagsOnResources"
    ADD CONSTRAINT "_TagsOnResources_B_fkey" FOREIGN KEY ("B") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

