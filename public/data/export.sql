--------------------------------------------------------
--  Fichier créé - mardi-avril-23-2024   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table VALUES_F
--------------------------------------------------------

  CREATE TABLE "IMSDB"."VALUES_F" 
   (	"SOURCE" CHAR(1 BYTE), 
	"STATIONID" NUMBER(5,0), 
	"VARID" NUMBER(4,0), 
	"MEASTIME" DATE, 
	"VALUE" NUMBER(15,6), 
	"STATUS" CHAR(1 BYTE), 
	"USERID" NUMBER(4,0), 
	"ERRRULEID" NUMBER(6,0), 
	"OPTIONS" CHAR(3 BYTE), 
	"MESSAGEID" NUMBER, 
	"VARNAME" VARCHAR2(64 BYTE), 
	"STATIONAME" VARCHAR2(64 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  Constraints for Table VALUES_F
--------------------------------------------------------

  ALTER TABLE "IMSDB"."VALUES_F" MODIFY ("VALUE" NOT NULL ENABLE);
 
  ALTER TABLE "IMSDB"."VALUES_F" MODIFY ("STATUS" NOT NULL ENABLE);
 
  ALTER TABLE "IMSDB"."VALUES_F" MODIFY ("USERID" NOT NULL ENABLE);
