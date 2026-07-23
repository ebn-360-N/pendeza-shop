// Open Order Form Modal
function openOrderForm(productId, productName) {
    document.getElementById('product_id').value = productId;
    document.getElementById('product_name').value = productName;
    document.getElementById('orderModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Order Form Modal
function closeOrderForm() {
    document.getElementById('orderModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close Success Modal
function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Handle Order Form Submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const customerName = document.getElementById('customer_name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const productName = document.getElementById('product_name').value;
    
    // Get current date and time
    const now = new Date();
    const dateTime = now.toLocaleString('sw-TZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Save order to localStorage (simulating database)
    const orders = JSON.parse(localStorage.getItem('pendeza_orders') || '[]');
    orders.push({
        id: orders.length + 1,
        customer_name: customerName,
        phone: phone,
        email: email,
        product_name: productName,
        order_date: dateTime
    });
    localStorage.setItem('pendeza_orders', JSON.stringify(orders));
    
    // Close order form
    closeOrderForm();
    
    // Show success message
    document.getElementById('successMessage').innerHTML = `
        <p>Asante <strong>${customerName}</strong>.</p>
        <p>Oda yako ya <strong>${productName}</strong> imepokelewa.</p>
        <p style="margin-top: 15px;">Tutawasiliana nawe kupitia:</p>
        <p>📞 <strong>${phone}</strong></p>
        <p>📧 <strong>${email}</strong></p>
        <p style="margin-top: 15px; font-size: 0.9em;">Tarehe: ${dateTime}</p>
    `;
    
    // Set WhatsApp link
    const whatsappNumber = "255629509100";
    const whatsappMessage = encodeURIComponent(
        `Habari, naitwa ${customerName}.\n` +
        `Nimeagiza ${productName} kutoka PENDEZA.\n` +
        `Namba yangu: ${phone}\n` +
        `Email: ${email}`
    );
    document.getElementById('whatsappLink').href = 
        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // Show success modal
    document.getElementById('successModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Send email notification using FormSubmit (free service)
    sendEmailNotification(customerName, phone, email, productName, dateTime);
    
    // Clear form
    this.reset();
});

// Send email using FormSubmit.co (free email forwarding service)
function sendEmailNotification(name, phone, email, product, date) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('product', product);
    formData.append('date', date);
    formData.append('_subject', 'ODA MPYA - PENDEZA');
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    
    fetch('https://formsubmit.co/ajax/pendezapendeza@gmail.com', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Email sent successfully');
    })
    .catch(error => {
        console.log('Email notification: ' + error);
    });
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target == document.getElementById('orderModal')) {
        closeOrderForm();
    }
    if (event.target == document.getElementById('successModal')) {
        closeSuccessModal();
    }
}

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeOrderForm();
        closeSuccessModal();
    }
});
