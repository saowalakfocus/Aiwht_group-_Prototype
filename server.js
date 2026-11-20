const http=require('http'),fs=require('fs'),path=require('path');
const PORT=process.env.PORT||3000;
const server=http.createServer(async(req,res)=>{
 const send=(code,type,body)=>{res.writeHead(code,{'Content-Type':type,'Access-Control-Allow-Origin':'same-origin'});res.end(body)};
 if(req.method==='POST'&&req.url==='/api/ai'){
  if(!process.env.OPENAI_API_KEY)return send(503,'application/json',JSON.stringify({error:'ยังไม่ได้ตั้งค่า OPENAI_API_KEY บนเซิร์ฟเวอร์'}));
  let raw='';req.on('data',c=>raw+=c);req.on('end',async()=>{
   try{
    const payload=JSON.parse(raw);
    const system=`คุณเป็นผู้ช่วยวิเคราะห์ภาษีเงินได้หัก ณ ที่จ่ายของไทยเพื่อการศึกษาเท่านั้น อธิบายจากข้อมูลที่ให้ ห้ามสร้างมาตราหรือ URL เอง หากไม่แน่ใจให้บอกตรงๆและแนะนำตรวจกรมสรรพากร ห้ามแทนผู้เชี่ยวชาญ`;
    const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Authorization':'Bearer '+process.env.OPENAI_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4.1-mini',input:[{role:'system',content:system},{role:'user',content:'ช่วยอธิบายผลคำนวณเบื้องต้นนี้เป็นภาษาไทย พร้อมระบุข้อเท็จจริงที่ต้องตรวจเพิ่ม: '+JSON.stringify(payload.transaction)}]})});
    const data=await r.json();if(!r.ok)throw new Error(data.error?.message||'OpenAI API error');
    const answer=(data.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('\\n')||'ไม่พบข้อความตอบกลับ';
    send(200,'application/json',JSON.stringify({answer}));
   }catch(e){send(500,'application/json',JSON.stringify({error:e.message}));}
  });return;
 }
 if(req.method==='GET'&&(req.url==='/'||req.url==='/index.html'))return send(200,'text/html; charset=utf-8',fs.readFileSync(path.join(__dirname,'index.html')));
 send(404,'text/plain','Not found');
});
server.listen(PORT,()=>console.log('AI WHT app running on '+PORT));
