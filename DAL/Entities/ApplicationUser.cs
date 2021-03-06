﻿using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace DAL.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FName { get; set; }
        public string LName { get; set; }

        public virtual ICollection<Person> People { get; set; }
        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }

        public ApplicationUser()
        {
            People = new List<Person>();
            RefreshTokens = new List<RefreshToken>();
        }
    }
}
