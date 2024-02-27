using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ServerSideEduAdminSystem.Data;
using ServerSideEduAdminSystem.Models;

namespace ServerSideEduAdminSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {

        private readonly EASContext _context;
       // private readonly IMemoryCache _memoryCache;

        public StudentController(EASContext context, IMemoryCache memoryCache)
        {
            _context = context;
            //_memoryCache = memoryCache;

        }

        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            if (student == null)
            {
                return BadRequest();
            }

            if (_context.Students.Any(s => s.StudentID == student.StudentID))
            {
                return BadRequest("Student with the same ID already exists.");
            }
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return Ok(200);
        }

        /// <summary>
        /// Note: Full-Text Search can be utilized here for improved search capabilities,
        /// but it's not compatible with my current database configuration.
        /// </summary>
        /// <param name="p_searchLetters"></param>
        /// <returns></returns>
        [HttpGet("SearchStudents")]
        public async Task<ActionResult<IEnumerable<Student>>> FilterStudents(string p_searchLetters)
        {
            var students = await _context.Students
                .Where(s => s.FirstName.Contains(p_searchLetters))
                .ToListAsync();

            if (!students.Any())
            {
                return NotFound("No matching students found.");
            }

            return students;
        }


        /// <summary>
        /// ביצועים
        /// הוספת האפשרות של אפשרות של זיכרון מטמון לביצועים טובים יותר
        /// יתרון: חוסך זמן של ייבוא התלמידים
        /// חיסרון: קיימת האפשרות שהנתונים לא יתעדכנו בזמן אמת כאשר נוסיף תלמיד או נמחק
        /// ------------------------------------------------------------------------
        /// Pageintaionבהנתן העובדה שאנו משתמשים ב LazyLoadingבוצע שימוש ב 
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [HttpGet("StudentsPerPage")]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudentsPerPage(int pageNumber = 1, int pageSize = 10)
        {
   
            // var cacheKey = $"Students_Page_{pageNumber}";
            // if (!_memoryCache.TryGetValue(cacheKey, out List<Student> cachedStudents))
            // {
            var students = await _context.Students
                                         .Skip((pageNumber - 1) * pageSize)
                                         .Take(pageSize)
                                         .ToListAsync();
            //   _memoryCache.Set(cacheKey, students, TimeSpan.FromMinutes(30)); // Cache for 30 minutes
            //   cachedStudents = students;
            //}

            return Ok(students);
        }
        



        [HttpGet]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await _context.Students.ToListAsync();

            return Ok(students);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(string id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound($"Student with ID {id} not found.");
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent(); // מחזיר 204 No Content כתגובה על מחיקה מוצלחת
        }
    }
}

