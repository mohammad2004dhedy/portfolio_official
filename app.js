// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle")
const body = document.body

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark"
body.setAttribute("data-theme", currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  // Add a subtle animation
  themeToggle.style.transform = "scale(0.9)"
  setTimeout(() => {
    themeToggle.style.transform = "scale(1)"
  }, 150)
})

// Scroll Progress Line
const scrollLine = document.querySelector(".scrollLine")
window.addEventListener("scroll", () => {
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = document.documentElement.scrollTop
  scrollLine.style.width = `${(scrolled / height) * 100}%`
})

// Back to Top Button
const upBtn = document.querySelector(".upBtn")
window.addEventListener("scroll", () => {
  if (window.scrollY >= 200) {
    upBtn.classList.add("active")
  } else {
    upBtn.classList.remove("active")
  }
})

// Mobile Navigation
const nav = document.querySelector("header .container nav")
const menuIcon = document.querySelector("header .container nav .navIcon")

menuIcon.onclick = () => {
  nav.classList.toggle("active")
}

// Navigation Menu Items
const navMenuItems = Array.from(document.querySelectorAll("header .container nav .navList li"))

navMenuItems.forEach((item) => {
  item.onclick = () => {
    navMenuItems.forEach((i) => {
      i.classList.remove("active")
    })
    item.classList.add("active")

    // Close mobile menu when item is clicked
    nav.classList.remove("active")
  }
})

// Skills Filter Functionality
const skillsMenuItem = Array.from(document.querySelectorAll(".skills .container .thumbnail button"))
const skillsBoxes = Array.from(document.querySelectorAll(".skills .container .content .box"))

const AOS = window.AOS // Declare AOS variable

skillsMenuItem.forEach((skillCat) => {
  skillCat.onclick = () => {
    removeActiveFromSkills()
    skillCat.classList.add("active")
    const cat = skillCat.getAttribute("data-cat")

    skillsBoxes.forEach((skillBox) => {
      if (cat === "all") {
        skillBox.classList.add("active")
      } else if (skillBox.dataset.type === cat) {
        skillBox.classList.add("active")
      }
    })

    // Refresh AOS animations
    AOS.refresh()

    // Animate progress bars
    setTimeout(() => {
      animateProgressBars()
    }, 300)
  }
})

const removeActiveFromSkills = () => {
  skillsMenuItem.forEach((skillCat) => {
    skillCat.classList.remove("active")
  })
  skillsBoxes.forEach((skillBox) => {
    skillBox.classList.remove("active")
  })
}

// Animate Progress Bars
const animateProgressBars = () => {
  const progressFills = document.querySelectorAll(".progress-fill")
  progressFills.forEach((fill) => {
    const width = fill.getAttribute("data-width")
    fill.style.setProperty("--width", width)
    fill.style.width = width
  })
}

// Initialize progress bars on page load
window.addEventListener("load", () => {
  setTimeout(() => {
    animateProgressBars()
  }, 1000)
})

// Contact Form Character Counter
const textAreaInput = document.querySelector(".contact .content form .message textarea")
const charCounter = document.querySelector(".contact .content form .message .Charlimit")
const charProgressBar = document.querySelector(".contact .content form .message .CharProgress")
const submitBtn = document.querySelector(".contact .submitBtn")

if (textAreaInput && charCounter && charProgressBar) {
  const inputMaxLength = textAreaInput.getAttribute("maxlength")
  charCounter.innerHTML = inputMaxLength

  textAreaInput.addEventListener("input", () => {
    const currentInputLength = textAreaInput.value.length
    const remaining = inputMaxLength - currentInputLength

    charCounter.innerHTML = remaining
    charProgressBar.style.width = `${(currentInputLength / inputMaxLength) * 100}%`

    if (remaining === 0) {
      charCounter.classList.add("zero")
      charProgressBar.style.backgroundColor = "var(--accent-secondary)"
      submitBtn.setAttribute("title", "You have reached the character limit")
    } else {
      charCounter.classList.remove("zero")
      charProgressBar.style.backgroundColor = "var(--accent-color)"
      submitBtn.setAttribute("title", "Send your message")
    }
  })
}

// Contact Form Submission
const contactForm = document.getElementById("contact-form")
const emailjs = window.emailjs // Declare emailjs variable

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault()

    // Add loading state
    const submitButton = contactForm.querySelector(".submitBtn")
    const originalText = submitButton.innerHTML
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitButton.disabled = true

    emailjs
      .sendForm("service_bk5hwqg", "template_tefb3ip", event.target)
      .then(() => {
        // Success
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
        submitButton.style.background = "var(--gradient-secondary)"

        // Reset form
        contactForm.reset()
        if (charCounter) charCounter.innerHTML = textAreaInput.getAttribute("maxlength")
        if (charProgressBar) charProgressBar.style.width = "0%"

        // Reset button after 3 seconds
        setTimeout(() => {
          submitButton.innerHTML = originalText
          submitButton.disabled = false
          submitButton.style.background = ""
        }, 3000)

        // Show success message
        showNotification("Message sent successfully!", "success")
      })
      .catch((error) => {
        // Error
        submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send'
        submitButton.style.background = "var(--accent-secondary)"

        // Reset button after 3 seconds
        setTimeout(() => {
          submitButton.innerHTML = originalText
          submitButton.disabled = false
          submitButton.style.background = ""
        }, 3000)

        // Show error message
        showNotification("Failed to send message. Please try again.", "error")
        console.error("EmailJS Error:", error)
      })
  })
}

// Notification System
const showNotification = (message, type = "info") => {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
    <span>${message}</span>
  `

  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: type === "success" ? "var(--gradient-primary)" : "var(--accent-secondary)",
    color: "white",
    padding: "15px 20px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    zIndex: "10000",
    transform: "translateX(400px)",
    transition: "transform 0.3s ease",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  })

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 5000)
}

// Visitors Alert Handler
const visitorsAlert = document.querySelector(".VisitorsAlert")
const alertButton = visitorsAlert?.querySelector("button")
let visitorsAlertTimer

if (visitorsAlert && alertButton) {
  visitorsAlertTimer = setTimeout(() => {
    visitorsAlert.style.display = "none"
  }, 8000)

  alertButton.onclick = () => {
    visitorsAlert.style.display = "none"
    clearTimeout(visitorsAlertTimer)
  }
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector("header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Intersection Observer for Navigation Active States
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll('.navList a[href^="#"]')

const observerOptions = {
  root: null,
  rootMargin: "-20% 0px -80% 0px",
  threshold: 0,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id")

      // Remove active class from all nav items
      navMenuItems.forEach((item) => item.classList.remove("active"))

      // Add active class to current nav item
      const activeNavItem = document.querySelector(`.navList a[href="#${id}"]`)?.parentElement
      if (activeNavItem) {
        activeNavItem.classList.add("active")
      }
    }
  })
}, observerOptions)

sections.forEach((section) => {
  observer.observe(section)
})

// Typewriter Effect for Hero Section
const typewriterText = document.querySelector(".role")
if (typewriterText) {
  const text = typewriterText.textContent
  const roles = ["Web Developer", "Frontend Developer", "UI/UX Enthusiast", "Problem Solver"]
  let roleIndex = 0
  let charIndex = 0
  let isDeleting = false

  const typeWriter = () => {
    const currentRole = roles[roleIndex]

    if (isDeleting) {
      typewriterText.textContent = currentRole.substring(0, charIndex - 1)
      charIndex--
    } else {
      typewriterText.textContent = currentRole.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000 // Pause at end
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      roleIndex = (roleIndex + 1) % roles.length
      typeSpeed = 500 // Pause before next role
    }

    setTimeout(typeWriter, typeSpeed)
  }

  // Start typewriter effect
  setTimeout(typeWriter, 1000)
}

// Parallax Effect for Floating Elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-element")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    const yPos = -(scrolled * speed)
    element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`
  })
})

// Add external link targets
const projectLinks = document.querySelectorAll('.projects a[href^="http"]')
projectLinks.forEach((link) => {
  link.setAttribute("target", "_blank")
  link.setAttribute("rel", "noopener noreferrer")
})

// Enhanced AOS initialization
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: "ease-out-cubic",
})

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll progress
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = document.documentElement.scrollTop
  scrollLine.style.width = `${(scrolled / height) * 100}%`

  // Back to top button
  if (window.scrollY >= 200) {
    upBtn.classList.add("active")
  } else {
    upBtn.classList.remove("active")
  }
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Trigger initial animations
  setTimeout(() => {
    const heroElements = document.querySelectorAll(".main .info > *")
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 200)
    })
  }, 500)
})

console.log("🚀 Portfolio loaded successfully!")
