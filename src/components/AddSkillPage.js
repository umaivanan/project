import { useState } from 'react';
import './SkillForm.css'; // Import the CSS file for styling

const categoryOptions = [
    { value: 'web', label: 'Web Development' },
    { value: 'data', label: 'Data Science' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'health', label: 'Health' }
];

const talentOptions = [
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'ux-ui', label: 'UX/UI Design' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'seo', label: 'SEO' }
];

const AddSkillPage = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [category, setCategory] = useState('');
    const [talent, setTalent] = useState('');
    const [logo, setLogo] = useState(null);
    const [modules, setModules] = useState([{ title: '', content: '' }]);
    const [additionalInfo, setAdditionalInfo] = useState('');

    const handleProfilePicChange = (e) => setProfilePic(URL.createObjectURL(e.target.files[0]));
    const handleLogoChange = (e) => setLogo(URL.createObjectURL(e.target.files[0]));

    const handleCategoryChange = (e) => setCategory(e.target.value);

    const handleTalentChange = (e) => setTalent(e.target.value);

    const handleModuleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedModules = [...modules];
        updatedModules[index][name] = value;
        setModules(updatedModules);
    };

    const addModule = () => setModules([...modules, { title: '', content: '' }]);

    const validateForm = () => {
        if (!logo) {
            return 'Please upload a logo or video.';
        }
        if (modules.length === 0 || modules.some(module => !module.title || !module.content)) {
            return 'Please fill out at least one module with title and content.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMessage = validateForm();
        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        const formDataToSend = new FormData();
        if (profilePic) formDataToSend.append('profilePic', profilePic);
        if (logo) formDataToSend.append('logo', logo);
        formDataToSend.append('category', category);
        formDataToSend.append('talent', talent);
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
                alert('Skill created successfully!');
                setProfilePic(null);
                setCategory('');
                setTalent('');
                setLogo(null);
                setModules([{ title: '', content: '' }]);
                setAdditionalInfo('');
            } else {
                alert(result.error || 'Failed to create skill');
            }
        } catch (error) {
            console.error('Error creating skill:', error);
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
                    <select id="category" value={category} onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        {categoryOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="talent">Talent</label>
                    <select id="talent" value={talent} onChange={handleTalentChange}>
                        <option value="">Select Talent</option>
                        {talentOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
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
