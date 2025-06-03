/** 인풋 최대입력값 제어 */
export function OnValueLimit(e: React.FormEvent<HTMLInputElement>) : void{
    const self : HTMLInputElement =  e.currentTarget;
    
    if (self.value.length < self.maxLength) return

    self.value = self.value.slice(0, self.maxLength);
};