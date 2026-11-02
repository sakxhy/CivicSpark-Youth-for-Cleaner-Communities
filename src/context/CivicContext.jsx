import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  initialCurrentUser,
  adminUser,
  badgesList,
  initialIssues,
  initialEvents,
  initialTransformations,
  leaderboardUsers,
  wasteDatabase,
  nearbyFacilities,
  communityPolls,
  communitySuggestions,
  communityDiscussions,
  impactMetrics
} from './seedData';

const CivicContext = createContext();

const STORAGE_KEYS = {
  USER: 'civicspark_user',
  ROLE: 'civicspark_role',
  ISSUES: 'civicspark_issues',
  EVENTS: 'civicspark_events',
  TRANSFORMATIONS: 'civicspark_transformations',
  POLLS: 'civicspark_polls',
  SUGGESTIONS: 'civicspark_suggestions',
  DISCUSSIONS: 'civicspark_discussions',
  CERTIFICATES: 'civicspark_certificates',
};

export const CivicProvider = ({ children }) => {
  // Current user role
  const [role, setRole] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ROLE) || 'volunteer';
  });

  // Current user details
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return initialCurrentUser;
  });

  // Issues
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ISSUES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return initialIssues;
  });

  // Events
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return initialEvents;
  });

  // Transformations
  const [transformations, setTransformations] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSFORMATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return initialTransformations;
  });

  // Polls
  const [polls, setPolls] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.POLLS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return communityPolls;
  });

  // Suggestions
  const [suggestions, setSuggestions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUGGESTIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return communitySuggestions;
  });

  // Discussions
  const [discussions, setDiscussions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DISCUSSIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return communityDiscussions;
  });

  // Certificates
  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        id: 'CERT-2026-8812',
        eventName: 'Joggers Park & Chimbai Seaside Cleanup and Wall Art',
        issueDate: 'October 22, 2026',
        hoursLogged: 5,
        recipientName: initialCurrentUser.name,
        role: 'Lead Youth Volunteer',
        verificationHash: 'SHA-0x9F31B4',
      }
    ];
  });

  // Notifications
  const [notifications, setNotifications] = useState([]);

  // Active Certificate Modal Target
  const [activeCertificate, setActiveCertificate] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSFORMATIONS, JSON.stringify(transformations));
  }, [transformations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POLLS, JSON.stringify(polls));
  }, [polls]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUGGESTIONS, JSON.stringify(suggestions));
  }, [suggestions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DISCUSSIONS, JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
  }, [certificates]);

  // Toast Helper
  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setNotifications(prev => [...prev, { id, title, message, type, time: 'Just now' }]);
    setTimeout(() => {
      dismissToast(id);
    }, 5000);
  };

  const dismissToast = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Switch Role
  const switchRole = (newRole) => {
    setRole(newRole);
    if (newRole === 'admin') {
      setUser(adminUser);
      addToast('Role Switched', 'Switched to Municipal Administrator Mode. Full verification and management enabled.', 'info');
    } else {
      setUser(initialCurrentUser);
      addToast('Role Switched', 'Switched to Youth Volunteer Mode.', 'info');
    }
  };

  // Helper to add points to current user and check badges
  const awardPoints = (amount, reason) => {
    setUser(prevUser => {
      const newPoints = prevUser.points + amount;
      let newLevel = prevUser.level;

      if (newPoints >= 1000) newLevel = 'Community Hero';
      else if (newPoints >= 500) newLevel = 'Green Warrior';
      else if (newPoints >= 250) newLevel = 'Cleanliness Champion';
      else if (newPoints >= 100) newLevel = 'Eco Beginner';

      // Check if unlocked new badge
      const unlockedBadges = [...(prevUser.badgeIds || [])];
      badgesList.forEach(b => {
        if (newPoints >= b.pointsRequired && !unlockedBadges.includes(b.id)) {
          unlockedBadges.push(b.id);
          addToast(`🎖️ Badge Unlocked!`, `Congratulations! You earned the "${b.name}" badge!`, 'success');
          try {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
          } catch (e) { }
        }
      });

      addToast(`+${amount} Green Points!`, reason, 'success');
      return {
        ...prevUser,
        points: newPoints,
        level: newLevel,
        badgeIds: unlockedBadges
      };
    });
  };

  // Report Issue
  const reportIssue = (newIssueData) => {
    const newIssue = {
      id: `iss-${Date.now()}`,
      title: newIssueData.title,
      category: newIssueData.category,
      description: newIssueData.description,
      location: newIssueData.location,
      coordinates: newIssueData.coordinates || [19.0596, 72.8295],
      photoUrl: newIssueData.photoUrl || 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=600',
      status: 'Reported',
      reportedBy: user.name,
      reporterAvatar: user.avatar,
      date: new Date().toISOString().split('T')[0],
      votes: 1,
      assignedDriveId: null,
      verified: true, // auto-verified for demo
      adminNotes: 'Submitted via Youth Civic Portal. Queued for inspection.',
    };

    setIssues(prev => [newIssue, ...prev]);
    awardPoints(50, 'Civic issue successfully reported and verified!');
    setUser(prev => ({ ...prev, reportedIssuesCount: (prev.reportedIssuesCount || 0) + 1 }));
    return newIssue;
  };

  // Update Issue Status (Admin)
  const updateIssueStatus = (issueId, status, adminNotes) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          status,
          adminNotes: adminNotes || issue.adminNotes,
          resolvedDate: status === 'Resolved' ? new Date().toISOString().split('T')[0] : issue.resolvedDate
        };
      }
      return issue;
    }));
    addToast('Status Updated', `Issue #${issueId.slice(-4)} is now marked as "${status}".`, 'info');
  };

  // Register for Event
  const registerForEvent = (eventId) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        if (ev.registeredUsers.includes(user.id)) return ev;
        return {
          ...ev,
          registeredCount: ev.registeredCount + 1,
          registeredUsers: [...ev.registeredUsers, user.id]
        };
      }
      return ev;
    }));

    const event = events.find(e => e.id === eventId);
    if (event) {
      awardPoints(event.pointsReward || 100, `Registered for "${event.title}"!`);
      setUser(prev => ({
        ...prev,
        completedDrivesCount: (prev.completedDrivesCount || 0) + 1,
        volunteerHours: (prev.volunteerHours || 0) + 4
      }));

      // Generate digital certificate draft for this event
      const newCert = {
        id: `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        eventName: event.title,
        issueDate: event.date,
        hoursLogged: 4,
        recipientName: user.name,
        role: 'Verified Civic Volunteer',
        verificationHash: `SHA-0x${Math.random().toString(16).substring(2, 8).toUpperCase()}`,
      };

      setCertificates(prev => [newCert, ...prev]);
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) { }
    }
  };

  // Unregister from Event
  const unregisterFromEvent = (eventId) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        return {
          ...ev,
          registeredCount: Math.max(0, ev.registeredCount - 1),
          registeredUsers: ev.registeredUsers.filter(id => id !== user.id)
        };
      }
      return ev;
    }));
    addToast('Event Registration Cancelled', 'You have withdrawn your registration.', 'info');
  };

  // Create Event (Admin)
  const createEvent = (eventData) => {
    const newEvent = {
      id: `drv-${Date.now()}`,
      title: eventData.title,
      category: eventData.category || 'Cleanliness Drive',
      date: eventData.date,
      time: eventData.time || '09:00 AM - 01:00 PM',
      location: eventData.location,
      coordinates: eventData.coordinates || [19.0596, 72.8295],
      description: eventData.description,
      image: eventData.image || 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=800',
      totalSlots: Number(eventData.totalSlots) || 30,
      registeredCount: 1,
      pointsReward: Number(eventData.pointsReward) || 100,
      organizer: user.name,
      equipmentProvided: eventData.equipmentProvided || 'Standard cleaning kit & safety gloves',
      registeredUsers: [user.id],
      status: 'Upcoming'
    };

    setEvents(prev => [newEvent, ...prev]);
    addToast('New Mission Created!', `Event "${eventData.title}" is now open for volunteers.`, 'success');
    return newEvent;
  };

  // Add Transformation
  const addTransformation = (data) => {
    const newTrans = {
      id: `tr-${Date.now()}`,
      title: data.title,
      location: data.location,
      date: 'Just Now',
      beforeImage: data.beforeImage,
      afterImage: data.afterImage,
      description: data.description,
      volunteersCount: Number(data.volunteersCount) || 12,
      wasteCollectedKg: Number(data.wasteCollectedKg) || 150,
      leadVolunteer: user.name,
      likes: 1
    };

    setTransformations(prev => [newTrans, ...prev]);
    awardPoints(75, 'New Before & After transformation published!');
    return newTrans;
  };

  // Like Transformation
  const likeTransformation = (id) => {
    setTransformations(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, likes: t.likes + 1 };
      }
      return t;
    }));
    addToast('Transformation Applauded! 👏', 'Thank you for supporting community hygiene champions!', 'info');
  };

  // Vote on Poll
  const votePoll = (pollId, optionId) => {
    setPolls(prev => prev.map(poll => {
      if (poll.id === pollId) {
        if (poll.userVotedOptionId) {
          addToast('Vote Already Cast', 'You have already voted on this community poll.', 'info');
          return poll;
        }
        return {
          ...poll,
          totalVotes: poll.totalVotes + 1,
          userVotedOptionId: optionId,
          options: poll.options.map(opt =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          )
        };
      }
      return poll;
    }));
    awardPoints(15, 'Thank you for exercising your civic voice!');
  };

  // Submit Suggestion
  const submitSuggestion = (data) => {
    const newSug = {
      id: `sug-${Date.now()}`,
      title: data.title,
      author: user.name,
      avatar: user.avatar,
      date: 'Just now',
      category: data.category || 'Green Space',
      votes: 1,
      commentsCount: 0,
      status: 'Community Review',
      description: data.description,
    };
    setSuggestions(prev => [newSug, ...prev]);
    awardPoints(20, 'Public space suggestion submitted!');
  };

  // Upvote Suggestion
  const upvoteSuggestion = (id) => {
    setSuggestions(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, votes: s.votes + 1 };
      }
      return s;
    }));
  };

  // Add Discussion Post
  const addDiscussionPost = (text) => {
    if (!text.trim()) return;
    const newPost = {
      id: `disc-${Date.now()}`,
      author: user.name,
      avatar: user.avatar,
      role: user.level || 'Civic Volunteer',
      time: 'Just now',
      text,
      likes: 0,
      replies: []
    };
    setDiscussions(prev => [newPost, ...prev]);
    awardPoints(10, 'Contributed to civic discussion thread!');
  };

  // Reset to default data
  const resetToDefaultData = () => {
    localStorage.clear();
    setRole('volunteer');
    setUser(initialCurrentUser);
    setIssues(initialIssues);
    setEvents(initialEvents);
    setTransformations(initialTransformations);
    setPolls(communityPolls);
    setSuggestions(communitySuggestions);
    setDiscussions(communityDiscussions);
    setCertificates([
      {
        id: 'CERT-2026-8812',
        eventName: 'Joggers Park & Chimbai Seaside Cleanup and Wall Art',
        issueDate: 'October 22, 2026',
        hoursLogged: 5,
        recipientName: initialCurrentUser.name,
        role: 'Lead Youth Volunteer',
        verificationHash: 'SHA-0x9F31B4',
      }
    ]);
    addToast('Data Reset', 'Demo data successfully refreshed to original state.', 'info');
  };

  // Computed Leaderboard that includes current user dynamically
  const dynamicLeaderboard = [...leaderboardUsers].map(u => {
    if (u.id === user.id) {
      return {
        ...u,
        points: user.points,
        badge: user.level,
        drivesAttended: user.completedDrivesCount || 7,
        verifiedReports: user.reportedIssuesCount || 5
      };
    }
    return u;
  }).sort((a, b) => b.points - a.points).map((u, idx) => ({ ...u, rank: idx + 1 }));

  return (
    <CivicContext.Provider
      value={{
        role,
        user,
        switchRole,
        issues,
        reportIssue,
        updateIssueStatus,
        events,
        registerForEvent,
        unregisterFromEvent,
        createEvent,
        transformations,
        addTransformation,
        likeTransformation,
        badges: badgesList,
        leaderboard: dynamicLeaderboard,
        wasteDatabase,
        nearbyFacilities,
        polls,
        votePoll,
        suggestions,
        submitSuggestion,
        upvoteSuggestion,
        discussions,
        addDiscussionPost,
        impactMetrics,
        notifications,
        addToast,
        dismissToast,
        certificates,
        activeCertificate,
        setActiveCertificate,
        resetToDefaultData,
        awardPoints,
      }}
    >
      {children}
    </CivicContext.Provider>
  );
};

export const useCivic = () => useContext(CivicContext);

