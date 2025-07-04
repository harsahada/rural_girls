import React, { useState } from 'react';
import './BusinessForm.css';

const BusinessForm = ({ onBack }) => {
    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        description: '',
        contactNumber: '',
        contactEmail: '',
        whatsappNumber: '',
        location: '',
        proofDocument: null,
        termsAccepted: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (name === 'proofDocument') {
            setFormData({ ...formData, [name]: files[0] });
        } else if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted :', formData);
        alert("Thank you for submitting your business! It is now instantly visible in the marketplace.");
        if (onBack) onBack();
    };

    return (
        <div className="business-form-overlay">
            <div className="business-form-container">
                <h2 className="form-title">Add Your Business</h2>
                <p className="form-subtitle">Your business will be instantly visible after submission. No approval needed!</p>

                <form onSubmit={handleSubmit} className="business-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="businessName">Business Name *</label>
                            <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ownerName">Owner Name *</label>
                            <input type="text" id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description"> Describe Ur busniess in small words*</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" required />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="contactNumber">Contact Number de bhai *</label>
                            <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contactEmail">Contact Email *</label>
                            <input type="email" id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="whatsappNumber">Whatsapp Number de bhai *</label>
                            <input type="tel" id="whatsappNumber" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">location *</label>
                            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group file-upload-section">
                        <label>Business Proof (License, etc.) *</label>
                        <div className="file-input-wrapper">
                            <label htmlFor="proofDocument" className="file-input-label">
                                Choose File
                            </label>
                            <input
                                type="file"
                                id="proofDocument"
                                name="proofDocument"
                                onChange={handleChange}
                                accept="application/pdf,image/*"
                                required
                            />
                            <span className="file-name">
                                {formData.proofDocument ? formData.proofDocument.name : 'No file chosen'}
                            </span>
                        </div>
                        <small className="file-instructions">PDF or image format. Max 5MB.</small>
                    </div>

                    <div className="form-group terms-group">
                        <input
                            type="checkbox"
                            id="terms"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="terms" className="terms-label">
                            I have read and accept the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-back" onClick={onBack}> Back </button>
                        <button type="submit" className="btn btn-submit"> Submit </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BusinessForm;