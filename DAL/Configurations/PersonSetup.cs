﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DAL.Entities;

namespace DAL.Configurations
{
    class PersonSetup : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder
                .HasKey(e => e.Id);

            builder
                .Property(e => e.Role)
                .IsRequired();

            builder
                .HasOne(e => e.ApplicationUser)
                .WithMany(e=>e.People)
                .HasForeignKey(e=>e.UserId)
                .IsRequired();

            builder
                .HasOne(e => e.Team)
                .WithMany(e => e.People)
                .HasForeignKey(e => e.TeamId);
        }
    }
}
