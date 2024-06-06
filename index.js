let lg = (d) => {
    let n = BigInt(d) / 10n;
    let c = 0;
    while (n) {
        c++;
        n /= 10n;
    }
    return c;
}

let pow = (n) => {
    let r = 1n;
    for (let i = 1n; i <= n; i++) {
        r *= 10n;
    }
    return r;
}

let decimal = pow(100);

let to = (d) => {
    return BigInt(d) * decimal;
}

let mul = (a, b) => {
    return (a * b) / (decimal);
}

let def = (a) => {
    let ta = BigInt(a);
    let i = 0;
    while (ta % 10n == 0n && ta)  {
        ta /= 10n;
        i++;
    }
    return [ta, i];
}

let div = (a, b) =>  {
    let [tb, tbl] = def(b);
    let [ta, tal] = def(a);
    if (tbl > tal) {
        let ka = decimal * ta / pow(tbl - tal);
        return ka / tb;
    } else {
        return decimal * ta / tb * pow(tal - tbl);
    }
}

let stringify = (d) => {
    let str = (d / decimal).toString();
    let mod = d % decimal;
    if (mod) {
        str += '.';
    }
    let dec = BigInt(decimal) / 10n;
    while (mod && dec) {
        str += (mod / dec).toString();
        mod = mod % dec;
        dec /= 10n;
    }
    while (dec) {
        str += '0';
        dec /= 10n;
    }
    return str;
}

let pi = 0n;
let step = 0;
let stepIter = 0;

let piOutput = document.querySelector('#pi');
let stepOutput = document.querySelector('#step');
let framerateOutput = document.querySelector('#framerate');
let plusstepOutput = document.querySelector('#plusstep');
let LOCK = 60;
piOutput.innerText = pi.toString();

let calculate = () => {
    let d = div(to(1), to(step * 2 + 1)) * 4n;
    if (step % 2 == 0) {
        pi += d;
    } else {
        pi -= d;
    }
    step++;
}

let de = 0;

let iterate = (time) => {
    let fps = 1 / ((time - de) / 1000);
    if (fps < LOCK) {
        stepIter--;
    } else {
        stepIter++;
    }
    framerateOutput.innerText = "Framerate: " + Math.floor(fps);
    plusstepOutput.innerText = "+step: " + stepIter;
    de = time;
    for (let i = 0; i < stepIter; i++) {
        calculate();
    }
    piOutput.innerText = stringify(pi);
    stepOutput.innerText = "Step: " + step;
    requestAnimationFrame(iterate);
}

iterate();
