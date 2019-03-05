﻿using System;
using System.Collections.Generic;
using BLL.DTO;

namespace BLL.Interfaces
{
    /// <summary>
    /// Service for working with status of task.
    /// </summary>
    public interface IStatusService
    {
        /// <summary>
        /// Get all active statuses.
        /// </summary>
        /// <returns>Enumeration of statuses</returns>
        IEnumerable<StatusDTO> GetActiveStatuses();

        /// <summary>
        /// Get all not active statuses.
        /// </summary>
        /// <returns>Enumeration of statuses</returns>
        IEnumerable<StatusDTO> GetNotActiveStatuses();

        /// <summary>
        /// Get all possible statuses for task.
        /// </summary>
        /// <returns>Enumeration of statuses</returns>
        IEnumerable<StatusDTO> GetAllStatuses();
    }
}