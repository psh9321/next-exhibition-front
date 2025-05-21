export const id_regex = /^[a-z]+[a-z0-9]{5,19}$/g;
 
export const pw_regex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-_+=]{6,15}$/;

export const name_regex = /^(?:[가-힣]{1,2})[가-힣]{1,3}$/;

export const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

export const phone_regex = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

export const birth_regex = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;