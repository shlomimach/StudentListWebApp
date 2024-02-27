IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Students')
BEGIN
    CREATE TABLE Students (
        StudentID NVARCHAR(9) PRIMARY KEY,
        FirstName NVARCHAR(50) NOT NULL,
        LastName NVARCHAR(50) NOT NULL,
        BirthDate DATE,
        BirthCountry NVARCHAR(50),
        Gender NVARCHAR(10),
        Class NVARCHAR(10),
        QuestionnaireStatus NVARCHAR(50) default null,
        PersonalPlanStatus NVARCHAR(50) default null,
        StudentStatus NVARCHAR(50),
        StudentType NVARCHAR(50),
        PreviousIdentificationMessage NVARCHAR(9)
    );
END

IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
              WHERE TABLE_NAME = 'Students' AND COLUMN_NAME = 'ImagePath')
BEGIN
    ALTER TABLE Students
    ADD Image NVARCHAR(MAX) NULL
END

