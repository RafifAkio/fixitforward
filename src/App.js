import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Search, MapPin, User, 
  CheckCircle, Send, CreditCard, Plus, PlusCircle, Camera, CheckSquare, Eye, EyeOff
} from 'lucide-react';
import './App.css'; 

// --- IMPORT BRAND ASSETS ---
import logoSvg from './logo.svg'; 
import titlePng from './Title.png';

// --- HELPER: FORMAT RUPIAH ---
const formatRupiah = (value) => {
  const numberString = value.replace(/[^0-9]/g, '');
  if (!numberString) return '';
  const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp${formattedNumber}`;
};

// --- INITIAL DATA ---
const INITIAL_ITEMS = [
  {
    id: 1,
    title: "Black Chair",
    fee: "Rp500.000",
    distance: "2.1 km",
    description: "The chair base not connects to the seat part anymore.",
    location: "Maguwoharjo, Sleman, Yogyakarta",
    category: "Furniture",
    status: "Available", 
    colorHex: "#1f2937", 
    image: null 
  },
  {
    id: 2,
    title: "Wood Table", 
    fee: "Rp300.000", 
    distance: "1.5 km",
    description: "One leg is wobbly and needs glue.",
    location: "Depok, Sleman",
    category: "Furniture",
    status: "Fixed", 
    colorHex: "#b45309", 
    image: null
  },
  {
    id: 3,
    title: "Metal Kettle", 
    fee: "Rp150.000",
    distance: "5.0 km",
    description: "The main part has clear burn marks.",
    location: "Gg. Mawar No. 57 Sidomulyo",
    category: "Appliances",
    status: "Available",
    colorHex: "#9ca3af", 
    image: null
  }
];

// --- COMPONENT: HEADER ---
const Header = ({ title, showBack, onBack, onNavigate }) => (
  <div className="header">
    {showBack ? (
      <button onClick={onBack} className="icon-btn mr-2">
        <ArrowLeft size={24} color="#1f2937" />
      </button>
    ) : (
      <img src={logoSvg} alt="Logo" className="brand-logo" />
    )}
    
    <div className="header-title-container">
      {title ? (
        <h1 className="header-title">{title}</h1>
      ) : (
        <img src={titlePng} alt="FixIt Forward" className="brand-title" />
      )}
    </div>

    {!showBack && (
      <div className="header-actions">
        <button onClick={() => onNavigate('upload')} className="icon-btn">
          <PlusCircle size={24} color="#4b5563" />
        </button>
        <Search size={24} color="#4b5563" />
        <div className="profile-pic">
           <User size={20} color="#6b7280" />
        </div>
      </div>
    )}
  </div>
);

// --- SCREEN: LOGIN (UPDATED) ---
const LoginScreen = ({ onLogin, onNavigateToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginClick = () => {
    // 1. Check for empty fields
    if (!email || !password) {
      alert("Please fill in both Email and Password to log in.");
      return;
    }

    // 2. Email Validation (must have @ and end with .com)
    const emailRegex = /\S+@\S+\.com/i; 
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address containing '@' and ending in '.com'.");
        return;
    }

    onLogin();
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <img src={logoSvg} alt="Logo" className="auth-logo" />
      </div>
      
      <div className="auth-form">
        <input 
          className="auth-input" 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        {/* Password Wrapper */}
        <div className="password-wrapper">
          <input 
            className="auth-input" 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div 
            className="password-toggle-icon" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>
        
        <button className="auth-btn btn-yellow" onClick={handleLoginClick}>
          Log in
        </button>
        
        <div className="divider">or</div>
        
        <button className="auth-btn google-btn">
           <span className="g-icon">G</span>
           <span>Continue with Google</span>
        </button>

        <div className="link-text" onClick={onNavigateToSignup}>
          Don't have an account? Sign Up
        </div>
      </div>
    </div>
  );
};

// --- SCREEN: SIGNUP (UPDATED) ---
const SignupScreen = ({ onSignup, onBack }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    rePassword: ''
  });

  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);

  // Handle change with phone number restriction
  const handleChange = (field, value) => {
    if (field === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [field]: numericValue });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSignupClick = () => {
    // 1. Check for empty fields
    if (!formData.username || !formData.email || !formData.phone || !formData.password || !formData.rePassword) {
      alert("Please fill in all fields to create an account.");
      return;
    }

    // 2. Email Validation (must have @ and end with .com)
    const emailRegex = /\S+@\S+\.com/i; 
    if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email address containing '@' and ending in '.com'.");
        return;
    }

    // 3. Check password match
    if (formData.password !== formData.rePassword) {
      alert("Passwords do not match!");
      return;
    }

    onSignup();
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <img src={logoSvg} alt="Logo" className="auth-logo" />
      </div>
      
      <div className="auth-form">
        <input 
          className="auth-input" 
          type="text" 
          placeholder="Username" 
          value={formData.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />
        <input 
          className="auth-input" 
          type="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <input 
          className="auth-input" 
          type="tel" 
          placeholder="Phone Number" 
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
        
        {/* Password Wrapper */}
        <div className="password-wrapper">
          <input 
            className="auth-input" 
            type={showPass ? "text" : "password"} 
            placeholder="Password" 
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          <div className="password-toggle-icon" onClick={() => setShowPass(!showPass)}>
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        {/* Re-enter Password Wrapper */}
        <div className="password-wrapper">
          <input 
            className="auth-input" 
            type={showRePass ? "text" : "password"} 
            placeholder="Reenter Password" 
            value={formData.rePassword}
            onChange={(e) => handleChange('rePassword', e.target.value)}
          />
          <div className="password-toggle-icon" onClick={() => setShowRePass(!showRePass)}>
            {showRePass ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>
        
        <button className="auth-btn btn-yellow" onClick={handleSignupClick}>
          Create Account
        </button>
        
        <div className="link-text" onClick={onBack}>
          Back to Login
        </div>
      </div>
    </div>
  );
};

// --- SCREEN: HOME ---
const HomeScreen = ({ items, onNavigate }) => {
  const getStatusClass = (status) => {
    switch(status) {
      case 'Available': return 'status-available';
      case 'In Progress': return 'status-in-progress';
      case 'Fixed': return 'status-fixed';
      default: return 'status-available';
    }
  };

  return (
    <div className="screen">
      <Header onNavigate={onNavigate} />
      <div className="scrollable-content">
        <div className="grid-list">
          <h2 className="text-xl text-bold" style={{ color: '#1f2937', marginBottom: '8px' }}>Available to Fix</h2>
          {items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onNavigate('detail', item)}
              className="item-card"
            >
              <div 
                className="card-image" 
                style={{ backgroundColor: item.colorHex || '#e5e7eb' }}
              >
                <span className={`status-badge ${getStatusClass(item.status)}`}>
                  {item.status}
                </span>

                {item.image ? (
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <>
                    <h3>{item.title}</h3>
                    <div className="accent-bar"></div>
                  </>
                )}
              </div>
              
              <div className="card-details">
                <div className="card-header">
                  <div>
                    <span className="category-badge">{item.category}</span>
                    <h3 className="text-xl text-bold" style={{ margin: 0 }}>{item.title}</h3>
                  </div>
                  <span className="price-tag text-xl">{item.fee}</span>
                </div>
                <div className="location-row">
                  <MapPin size={16} style={{ marginRight: '4px' }} />
                  <span>{item.location}</span>
                </div>
                <button className="btn-primary">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SCREEN: UPLOAD ---
const UploadScreen = ({ onBack, onAddItem }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Furniture',
    fee: '',
    location: '',
    description: '',
    image: null
  });

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleFeeChange = (e) => {
    const formatted = formatRupiah(e.target.value);
    setFormData({ ...formData, fee: formatted });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.fee) {
      alert("Please fill in at least Title and Fee");
      return;
    }

    onAddItem({
      title: formData.title,
      category: formData.category,
      fee: formData.fee,
      location: formData.location || "Unknown Location",
      description: formData.description,
      image: formData.image,
      status: "Available", 
      colorHex: '#374151' 
    });
  };

  return (
    <div className="screen white-bg">
      <Header showBack onBack={onBack} title="Upload Broken Item" />
      <div className="scrollable-content">
        <div className="upload-form">
          <div className="image-upload-box" onClick={() => fileInputRef.current.click()}>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} />
            {formData.image ? (
              <img src={formData.image} alt="Preview" className="uploaded-image-preview" />
            ) : (
              <div className="upload-placeholder">
                <Camera size={48} color="#9ca3af" style={{ marginBottom: '8px' }} />
                <p style={{ margin: 0, fontWeight: 500 }}>Tap to upload photo</p>
                <p style={{ margin: 0, fontSize: '0.8rem' }}>JPG or PNG</p>
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Item Name</label>
            <input className="form-input" placeholder="e.g., Broken Toaster" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Item Type</label>
            <select className="form-select" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Appliances">Appliances</option>
              <option value="Clothing">Clothing</option>
              <option value="Automotive">Automotive</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Fee (Price)</label>
            <input className="form-input" placeholder="Rp150.000" type="text" value={formData.fee} onChange={handleFeeChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Pick-up Location</label>
            <div style={{ position: 'relative' }}>
              <input className="form-input" placeholder="Where is the item?" style={{ width: '100%', boxSizing: 'border-box', paddingLeft: '40px' }} value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
              <MapPin size={20} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '14px' }} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description of Problem</label>
            <textarea className="form-textarea" placeholder="Describe the damage..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
        </div>
      </div>
      <div className="footer-actions">
         <button onClick={handleSubmit} className="btn-solid" style={{ gridColumn: 'span 2' }}>Post Item</button>
      </div>
    </div>
  );
};

// --- SCREEN: DETAIL ---
const DetailScreen = ({ item, onBack, onNavigate, onUpdateStatus }) => {
  return (
    <div className="screen white-bg">
      <Header showBack onBack={onBack} title="Item Details" />
      
      <div className="scrollable-content">
        <div className="detail-hero" style={{ backgroundColor: item.colorHex || '#333' }}>
           {item.image ? (
             <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           ) : (
             <span style={{ color: 'white', opacity: 0.3, fontSize: '2.5rem', fontWeight: 'bold' }}>{item.title}</span>
           )}
        </div>

        <div className="content-padding">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <h2 className="text-2xl text-bold" style={{ marginBottom: '4px', marginTop: 0 }}>{item.title}</h2>
            <span className="category-badge">{item.category}</span>
          </div>
          <p className="text-2xl text-bold" style={{ color: '#eab308', margin: '0 0 24px 0' }}>{item.fee}</p>
          <div className="mb-2">
            <span className="section-label">Description</span>
            <p className="description-box">{item.description}</p>
          </div>
          <div style={{ marginTop: '24px' }}>
             <span className="section-label">Location</span>
             <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={20} color="#eab308" />
                <p style={{ margin: 0 }}>{item.location}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="footer-actions" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
          {item.status === 'Available' ? (
             <button onClick={() => onNavigate('checkout', item)} className="btn-solid">Fix It</button>
          ) : (
             <button disabled className="btn-solid" style={{ opacity: 0.5 }}>{item.status}</button>
          )}
          <button onClick={() => onNavigate('chat', item)} className="btn-outline">Chat!</button>
        </div>

        {item.status === 'In Progress' && (
          <button 
            onClick={() => onUpdateStatus(item.id, 'Fixed')}
            className="btn-complete"
          >
            <CheckSquare size={20} />
            Mark as Fixed
          </button>
        )}
      </div>
    </div>
  );
};

// --- SCREEN: CHAT ---
const ChatScreen = ({ item, onBack, onNavigate }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "How much fee are you aiming for?", sender: 'other' },
    { id: 2, text: "How about 250 thousand?", sender: 'me' },
    { id: 3, text: "That's too low, how about 400.000?", sender: 'other' },
    { id: 4, text: "Too high, 350.000?", sender: 'me' },
    { id: 5, text: "Fair enough!", sender: 'other' }
  ]);
  const [input, setInput] = useState("");
  const [isOfferMode, setIsOfferMode] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [currentOffer, setCurrentOffer] = useState(null); 
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentOffer]);

  const handleSend = () => {
    if(!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, sender: 'me' }]);
    setInput("");
  };

  const handleOfferChange = (e) => {
    const formatted = formatRupiah(e.target.value);
    setOfferAmount(formatted);
  };

  const handlePropose = () => {
    if(!offerAmount) return;
    setCurrentOffer(offerAmount);
    setIsOfferMode(false);
    setOfferAmount("");
  };

  return (
    <div className="screen">
      <Header showBack onBack={onBack} title={item.title} />
      <div className="scrollable-content chat-area">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-row ${msg.sender}`}>
            <div className={`message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {isOfferMode && (
        <div className="offer-creator">
          <input 
            type="text" placeholder="Rp350.000" className="offer-input"
            value={offerAmount} onChange={handleOfferChange} autoFocus
          />
          <button onClick={handlePropose} className="btn-propose">Propose</button>
        </div>
      )}

      <div className="deal-wrapper">
        {currentOffer && (
          <div className="deal-box">
            <div className="deal-info">
              <h4>Agreed Price</h4>
              <p className="deal-price">{currentOffer}</p>
            </div>
            <div className="deal-actions">
              <button onClick={() => setCurrentOffer(null)} className="btn-deny">Deny</button>
              <button 
                onClick={() => onNavigate('checkout', { ...item, fee: currentOffer })}
                className="btn-confirm"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
        <div className="chat-input-bar">
          <button className={`plus-btn ${isOfferMode ? 'active' : ''}`} onClick={() => setIsOfferMode(!isOfferMode)}>
            <Plus size={24} />
          </button>
          <div className="chat-input-container">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={isOfferMode ? "Enter price to propose..." : "Type Chat..."} className="chat-input" />
            <button onClick={handleSend} className="send-btn-float"><Send size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SCREEN: CHECKOUT ---
const CheckoutScreen = ({ item, onBack, onNavigate, onUpdateStatus }) => {
  const [paymentMethod, setPaymentMethod] = useState('COD'); 

  const handleFixIt = () => {
    onUpdateStatus(item.id, 'In Progress');
    onNavigate('success', item);
  };

  return (
    <div className="screen">
      <Header showBack onBack={onBack} title="Checkout" />
      <div className="scrollable-content" style={{ padding: '16px' }}>
        <div className="checkout-section">
          <h3 className="text-bold" style={{ margin: '0 0 4px 0', color: '#111827' }}>{item.title}</h3>
          <p className="text-2xl text-bold" style={{ margin: 0, color: '#eab308' }}>{item.fee}</p>
        </div>
        
        <div className="checkout-section">
          <label className="section-label">Pick-up Address</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <MapPin color="#eab308" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '0.875rem', margin: 0, color: '#374151' }}>
              Gg. Melati No 52 Sambulerjo, Maguwoharjo, Depok, Sleman, Yogyakarta
            </p>
          </div>
        </div>
        <div className="checkout-section">
          <label className="section-label" style={{ marginBottom: '12px' }}>Payment Method</label>
          
          <div 
            className={`payment-row ${paymentMethod === 'SPay' ? 'active' : 'inactive'}`} 
            onClick={() => setPaymentMethod('SPay')}
          >
             <CreditCard size={20} color="#3b82f6" style={{ marginRight: '12px' }} />
             <span style={{ fontWeight: 500 }}>SPay</span>
             <input type="radio" name="payment" style={{ marginLeft: 'auto', accentColor: '#eab308' }} checked={paymentMethod === 'SPay'} readOnly />
          </div>
          
          <div 
            className={`payment-row ${paymentMethod === 'COD' ? 'active' : 'inactive'}`}
            onClick={() => setPaymentMethod('COD')}
          >
             <span className="text-bold" style={{ marginRight: '12px' }}>COD</span>
             <span style={{ fontWeight: 500 }}>Cash On Delivery</span>
             <input type="radio" name="payment" style={{ marginLeft: 'auto', accentColor: '#eab308' }} checked={paymentMethod === 'COD'} readOnly />
          </div>
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: 'white', borderTop: '1px solid #e5e7eb' }}>
        <button 
          onClick={handleFixIt}
          className="btn-solid"
          style={{ width: '100%', padding: '16px' }}
        >
          Fix It!
        </button>
      </div>
    </div>
  );
};

// --- SCREEN: SUCCESS ---
const SuccessScreen = ({ item, onNavigate }) => {
  return (
    <div className="screen success-screen">
      <div className="circle-check">
        <CheckCircle size={48} color="#22c55e" />
      </div>
      <h1 className="text-bold" style={{ fontSize: '2rem', margin: '0 0 8px 0', color: '#111827' }}>FIXED!</h1>
      <p style={{ color: '#6b7280', margin: '0 0 32px 0' }}>Your Request is on its way</p>
      <div className="summary-card">
        <p className="section-label" style={{ textAlign: 'center' }}>Agreed Fee</p>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#111827' }}>{item.fee}</p>
      </div>
      <button onClick={() => onNavigate('home')} className="btn-yellow-block">Back to Home</button>
    </div>
  );
};

// --- MAIN APP CONTROLLER ---
export default function App() {
  const [screen, setScreen] = useState('login'); 
  const [activeItem, setActiveItem] = useState(null);
  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleNavigate = (targetScreen, item = null) => {
    if (item) setActiveItem(item);
    setScreen(targetScreen);
    window.scrollTo(0, 0);
  };

  const addItem = (newItem) => {
    const itemWithId = { ...newItem, id: Date.now() };
    setItems([itemWithId, ...items]); 
    setScreen('home');
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updatedItems = items.map(i => i.id === id ? { ...i, status: newStatus } : i);
    setItems(updatedItems);
    
    if (activeItem && activeItem.id === id) {
      setActiveItem({ ...activeItem, status: newStatus });
    }
  };

  return (
    <div className="app-container">
      {screen === 'login' && (
        <LoginScreen 
          onLogin={() => setScreen('home')} 
          onNavigateToSignup={() => setScreen('signup')} 
        />
      )}

      {screen === 'signup' && (
        <SignupScreen 
          onSignup={() => setScreen('home')} 
          onBack={() => setScreen('login')}
        />
      )}

      {screen === 'home' && <HomeScreen items={items} onNavigate={handleNavigate} />}
      
      {screen === 'upload' && (
        <UploadScreen 
          onBack={() => setScreen('home')} 
          onAddItem={addItem} 
        />
      )}

      {screen === 'detail' && activeItem && (
        <DetailScreen 
          item={activeItem} 
          onBack={() => setScreen('home')} 
          onNavigate={handleNavigate} 
          onUpdateStatus={handleUpdateStatus} 
        />
      )}

      {screen === 'chat' && activeItem && (
        <ChatScreen 
          item={activeItem} 
          onBack={() => setScreen('detail')} 
          onNavigate={handleNavigate} 
        />
      )}

      {screen === 'checkout' && activeItem && (
        <CheckoutScreen 
          item={activeItem} 
          onBack={() => setScreen('detail')} 
          onNavigate={handleNavigate} 
          onUpdateStatus={handleUpdateStatus} 
        />
      )}

      {screen === 'success' && activeItem && (
        <SuccessScreen 
          item={activeItem} 
          onNavigate={(s) => setScreen(s)} 
        />
      )}
    </div>
  );
}