namespace ServerSideEduAdminSystem.Models
{
    public class Student
    {
        public string StudentID { get; set; } // תעודת זהות
        public string FirstName { get; set; } // שם פרטי
        public string LastName { get; set; } // שם משפחה
        public DateTime BirthDate { get; set; } // תאריך לידה
        public string BirthCountry { get; set; } // ארץ לידה
        public string Gender { get; set; } // מין
        public string Class { get; set; } // כיתה
        public string? QuestionnaireStatus { get; set; } // סטאטוס שאלון
        public string? PersonalPlanStatus { get; set; } // סטאטוס תוכנית אישית
        public string StudentStatus { get; set; } // סטאטוס תלמיד
        public string StudentType { get; set; } // סוג תלמיד
        public string PreviousIdentificationMessage { get; set; } // מסר זיהוי קודם

        //הבדלים בין לImageBase64  ל ImagePath
        //דורש מעט מקום במסד נתונים אך נדרשת תחזוקה של מבנה הקבצים והתיקיות בשרת ImagePath
        //התמונה מאוחסנת ישירות במסד הנתונים, מה שמקל על העברת ושיתוף הנתונים אך יש פגיעה בביצועים ImageBase64
        public string? ImagePath { get; set; }// יש אפשרות גם לImageBase64  
    }
}
