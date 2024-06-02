--------------------------------------------------------
--  Fichier créé - mardi-avril-23-2024   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table VARIABLES
--------------------------------------------------------

  CREATE TABLE "IMSDB"."VARIABLES" 
   (	"ID" NUMBER(4,0), 
	"NAME" VARCHAR2(64 BYTE), 
	"DESCRIPTION" VARCHAR2(128 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into IMSDB.VARIABLES
SET DEFINE OFF;
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('32','Press.Station',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('34','Wind.Dir.Left',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('40','Snow.Height.Raw',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('47','Temp.Dry.Max.Dly',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('49','Wind.Max.Speed.Every3H',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('55','RelHumidity.MaxTime.Dly',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('65','Sun.Duration.secs',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('75','Temp.Dry.Mean.Dly',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('39','Press.QFF',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('45','RelHumidity.Max.Dly',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('53','Wind.Max.Speed.Dly',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('57','Temp.Dry.MaxTime.Dly',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('60','Press.Tendency.3h',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('63','Prec.Sum.Prev18To18',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('67','Radiation.Global.1min',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('50','Wind.Max.Time.06To06',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('52','Wind.Max.Time.Dly',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('54','RelHumidity.MinTime.Dly',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('56','Temp.Dry.MinTime.Dly',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('62','Prec.Sum.Prev12To12',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('70','Wind.1min.Dir.Right',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('71','Wind.1min.Speed',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('76','Temp.Dry.Max.06To06',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('79','Sun.Duration.Sum.06To06',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('33','Wind.Dir',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('35','Wind.Dir.Right',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('36','Wind.Gust.50min.Speed',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('37','Wind.Gust.Speed',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('64','Sun.Duration',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('46','Temp.Dry.Min.Dly',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('48','Wind.Max.Time.Every3H',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('51','Wind.Max.Speed.06To06',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('66','Prec.Sum.1min',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('69','Wind.1min.Dir.Left',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('73','Sun.Ind',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('77','Temp.Dry.Min.18To18',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('78','Wind.Max.Dir.Dly',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('5','Press.Barometer.Max',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('8','Radiation.Global.Sum',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('13','Wind.60min.Dir',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('18','Wind.Gust.60min.Dir',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('22','Station.Comm.lastReplyTime',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('25','Station.Comm.cq',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('2','Station.LBattery',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('10','Temp.Dry.Min',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('15','Wind.60min.Dir.Right',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('23','Station.Comm.endTime',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('24','Station.Comm.tries',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('29','Station.Comm.connectDetail',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('4','Press.Barometer.Min',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('7','Snow.Height',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('12','RelHumidity',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('17','Wind.Gust.60min.Speed',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('26','Station.Comm.statusCode',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('1','Station.Battery',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('6','Prec',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('9','Temp.Dry',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('14','Wind.60min.Dir.Left',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('19','Wind.Gust.60min.Time',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('20','Station.Comm.startTime',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('27','Station.Comm.messages',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('3','Press.Barometer',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('11','Temp.Dry.Max',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('16','Wind.60min.Speed',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('21','Station.Comm.connectTime',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('28','Station.Comm.err',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('31','Temp.DewPoint',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('30','Vapour.Press',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('38','Wind.Speed',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('41','Press.QNH',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('44','RelHumidity.Min.Dly',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('58','Radiation.Global',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('61','Prec.Sum.Prev06To06',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('68','Wind.1min.Dir',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('72','Wind.1min.Gust.Speed',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('74','Snow.Hourly.Increment',null);
Insert into IMSDB.VARIABLES (ID,NAME,DESCRIPTION) values ('80','RelHumidity.Moy.Dly',null);
--------------------------------------------------------
--  DDL for Index PK_VARIABLES
--------------------------------------------------------

  CREATE UNIQUE INDEX "IMSDB"."PK_VARIABLES" ON "IMSDB"."VARIABLES" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index UQ_VARIABLES
--------------------------------------------------------

  CREATE UNIQUE INDEX "IMSDB"."UQ_VARIABLES" ON "IMSDB"."VARIABLES" ("NAME") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  Constraints for Table VARIABLES
--------------------------------------------------------

  ALTER TABLE "IMSDB"."VARIABLES" ADD CONSTRAINT "PK_VARIABLES" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
 
  ALTER TABLE "IMSDB"."VARIABLES" MODIFY ("NAME" NOT NULL ENABLE);
 
  ALTER TABLE "IMSDB"."VARIABLES" ADD CONSTRAINT "UQ_VARIABLES" UNIQUE ("NAME")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
