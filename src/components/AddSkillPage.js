import { useState } from 'react';
import './SkillForm.css'; // Import the CSS file for styling

const AddSkillPage = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [categories, setCategories] = useState([]);
    const [talents, setTalents] = useState([]);
    const [logo, setLogo] = useState(null);
    const [modules, setModules] = useState([{ title: '', content: '' }]);
    const [additionalInfo, setAdditionalInfo] = useState('');

    const handleProfilePicChange = (e) => setProfilePic(URL.createObjectURL(e.target.files[0]));
    const handleLogoChange = (e) => setLogo(URL.createObjectURL(e.target.files[0]));

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setCategories(selectedOptions);
    };

    const handleTalentChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setTalents(selectedOptions);
    };

    const handleModuleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedModules = [...modules];
        updatedModules[index][name] = value;
        setModules(updatedModules);
    };

    const addModule = () => setModules([...modules, { title: '', content: '' }]);

    const validateForm = () => {
        // Example validation: ensure at least one module is filled
        if (modules.length === 0 || modules.some(module => !module.title || !module.content)) {
            return 'Please fill out at least one module with title and content.';
        }

        // Additional validations can be added as required
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form
        const errorMessage = validateForm();
        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        // Prepare form data
        const formDataToSend = new FormData();
        if (profilePic) formDataToSend.append('profilePic', profilePic);
        if (logo) formDataToSend.append('logo', logo);
        formDataToSend.append('categories', JSON.stringify(categories));
        formDataToSend.append('talents', JSON.stringify(talents));
        formDataToSend.append('additionalInfo', additionalInfo);

        modules.forEach((module, index) => {
            formDataToSend.append(`modules[${index}][title]`, module.title);
            formDataToSend.append(`modules[${index}][content]`, module.content);
        });

        try {
            const response = await fetch('http://localhost:8600/api/skills/add', {
                method: 'POST',
                body: formDataToSend
            });

            const result = await response.json();
            if (response.ok) {
                alert('Skill added successfully');
                // Optionally redirect or reset the form
                setProfilePic(null);
                setCategories([]);
                setTalents([]);
                setLogo(null);
                setModules([{ title: '', content: '' }]);
                setAdditionalInfo('');
            } else {
                alert(result.error || 'Failed to add skill');
            }
        } catch (error) {
            console.error('Error adding skill:', error);
            alert('An unexpected error occurred');
        }
    };

    return (
        <div className="add-skill-container">
            <form onSubmit={handleSubmit} className="skill-form">
                <div className="profile-section">
                    <div className="profile-pic">
                        {profilePic ? <img src={profilePic} alt="Profile" /> : <div className="pic-placeholder">Upload Profile Picture</div>}
                        <input type="file" onChange={handleProfilePicChange} accept="image/*" />
                    </div>
                    <h2>Profile</h2>
                </div>

                <div className="input-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" multiple value={categories} onChange={handleCategoryChange}>
                        <option value="web">Web Development</option>
                        <option value="data">Data Science</option>
                        <option value="design">Design</option>
                        <option value="marketing">Marketing</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                        <option value="health">Health</option>
                        {/* Add more categories as needed */}
                    </select>
                    <p>Selected Categories: {categories.join(', ')}</p>
                </div>

                <div className="input-group">
                    <label htmlFor="talent">Talent</label>
                    <select id="talent" multiple value={talents} onChange={handleTalentChange}>
                        <option value="frontend">Frontend Development</option>
                        <option value="backend">Backend Development</option>
                        <option value="machine-learning">Machine Learning</option>
                        <option value="ux-ui">UX/UI Design</option>
                        <option value="graphic-design">Graphic Design</option>
                        <option value="seo">SEO</option>
                        {/* Add more talents as needed */}
                    </select>
                    <p>Selected Talents: {talents.join(', ')}</p>
                </div>

                <div className="input-group">
                    <label htmlFor="logo">Logo/Video</label>
                    <div className="logo-upload">
                        {logo ? <img src={logo} alt="Logo" /> : <div className="upload-placeholder">Upload Logo or Video</div>}
                        <input type="file" onChange={handleLogoChange} accept="image/*,video/*" />
                    </div>
                </div>

                {modules.map((module, index) => (
                    <div className="module-group" key={index}>
                        <h3>Module {index + 1}</h3>
                        <div className="input-group">
                            <label htmlFor={`module-title-${index}`}>Title</label>
                            <input
                                type="text"
                                id={`module-title-${index}`}
                                name="title"
                                value={module.title}
                                onChange={(e) => handleModuleChange(index, e)}
                                placeholder="Module Title"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor={`module-content-${index}`}>Content</label>
                            <textarea
                                id={`module-content-${index}`}
                                name="content"
                                value={module.content}
                                onChange={(e) => handleModuleChange(index, e)}
                                placeholder="Module Content"
                                required
                            />
                        </div>
                    </div>
                ))}
                <button type="button" onClick={addModule}>Add Another Module</button>

                <div className="input-group">
                    <label htmlFor="additional-info">Additional Information</label>
                    <textarea
                        id="additional-info"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        placeholder="Enter additional information"
                    />
                </div>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default AddSkillPage;