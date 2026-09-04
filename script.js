// 1. डिफ़ॉल्ट रूप से पेज लोड होने पर चेक करें कि यूजर लॉग-इन है या नहीं
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('loggedInUser');
    const savedInitial = localStorage.getItem('userInitial');
    
    if (currentUser && savedInitial) {
        // अगर यूजर पहले से लॉग-इन है, तो उसका प्रोफाइल आइकॉन अपडेट करें
        updateProfileUI(savedInitial);
    } else {
        // अगर लॉग-इन नहीं है, तो लॉग-आउट स्टेट दिखाएं
        showLoggedOutState();
    }
});

// 2. Sign Up हैंडल करते समय Name का पहला अक्षर लें और सेव करें
function handleSignUp(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('signup-name').value.trim();
    const emailInput = document.getElementById('signup-email').value.trim();
    
    if (nameInput && emailInput) {
        // नाम का पहला अक्षर निकालें (जैसे 'A')
        const firstLetter = nameInput.charAt(0).toUpperCase();
        
        // localStorage में डेटा सेव करें
        localStorage.setItem('userName', nameInput);
        localStorage.setItem('userInitial', firstLetter);
        localStorage.setItem('loggedInUser', emailInput);
        
        // UI अपडेट करें और मॉडल/फॉर्म बंद करें (अगर कोई फंक्शन हो)
        updateProfileUI(firstLetter);
        
        // उदाहरण के लिए सफलता का संदेश
        alert('साइन अप सफल रहा!');
    }
}

// 3. Login हैंडल करने के लिए (लॉगिन फॉर्म के लिए)
function handleLogin(event) {
    if (event) event.preventDefault();
    
    const emailInput = document.getElementById('signin-email').value.trim();
    
    if (emailInput) {
        // यूजर का ईमेल सेव करें
        localStorage.setItem("loggedInUser", emailInput);
        
        // अगर आपके पास यूजर का नाम पहले से है तो ठीक, वरना ईमेल के पहले अक्षर को इनिशियल बना लें
        const firstLetter = emailInput.charAt(0).toUpperCase();
        localStorage.setItem('userInitial', firstLetter);
        
        updateProfileUI(firstLetter);
        alert('लॉगिन सफल रहा!');
    }
}

// 4. प्रोफाइल UI को अपडेट करने का फंक्शन
function updateProfileUI(initial) {
    const profileIcon = document.getElementById('profileInitial'); // आपके HTML के हिसाब से id 'profileInitial' है
    if (profileIcon) {
        profileIcon.textContent = initial; // यहाँ 'A' या जो भी नाम का पहला अक्षर हो वह दिखेगा
    }
}

// 5. लॉग आउट फंक्शन (जब यूजर लॉग आउट बटन दबाए)
function handleLogout() {
    // localStorage से सारा डेटा हटा दें
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userName');
    localStorage.removeItem('userInitial');
    
    // लॉग-आउट स्टेट पर जाएं
    showLoggedOutState();
    alert('आप सफलतापूर्वक लॉग आउट हो चुके हैं।');
    window.location.reload(); // पेज रीलोड करके सब कुछ रिसेट कर दें
}

// 6. लॉग-आउट स्टेट दिखाने का फंक्शन
function showLoggedOutState() {
    // फॉर्म्स को खाली करें
    const emailField = document.getElementById('signin-email');
    if (emailField) emailField.value = '';
    
    const profileIcon = document.getElementById('profileInitial');
    if (profileIcon) {
        profileIcon.textContent = 'U'; // डिफ़ॉल्ट अक्षर या खाली रख सकते हैं
    }
}