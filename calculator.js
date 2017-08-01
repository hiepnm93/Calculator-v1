var math_cal = {}
math_cal.cal = function (number,srt_subtend){
    if (!srt_subtend)
        return 0;
    if (number!=parseInt(number)){
        return Infinity;
    }else{
        if (srt_subtend.indexOf('*')>-1)
        {
        var srt_tmp = srt_subtend.split("*");
            var number_new = parseInt(srt_tmp[1]);
            return (number_new*number);
        }
        if (srt_subtend.indexOf('/')>-1)
        {
            var srt_tmp = srt_subtend.split("/");
            var number_new = parseInt(srt_tmp[1]);
            return (number/number_new);
        }
        if (srt_subtend.indexOf('+')>-1)
        {
            var srt_tmp = srt_subtend.split("+");
            var number_new = parseInt(srt_tmp[1]);
            return (number+number_new);
        }
         if (srt_subtend.indexOf('-')>-1)
        {
            var srt_tmp = srt_subtend.split("-");
            var number_new = parseInt(srt_tmp[1]);
            return (number-number_new);
        }
        if (srt_subtend.indexOf('mirror')>-1)
        {
            if (number>0){
                var srt_tmp = "" + number;
                var number_new = srt_tmp.split("").reverse().join("");
                return parseInt(srt_tmp+number_new);
            }else if (number<0){
                return -math_cal.cal(-number,"mirror");
            }else
                return 0;
            
        }
        if (srt_subtend.indexOf('<<')>-1)
        {
            if (number>0){
                var srt_tmp = "" + number;
                if (srt_tmp.length<=1)
                    return 0;
                else{
                    var new_array = srt_tmp.split("");
                    new_array.length = new_array.length-1;
                    return parseInt(new_array.join(""));
                }
            }else if (number<0){
                return -math_cal.cal(-number,"<<");
            }else
                return 0;
        }
        if (srt_subtend.indexOf('=>')>-1)
        {
            var new_array = srt_subtend.split("=>");
            var numberL = new_array[0];
            var numberR = new_array[1];
            var tmp_string = ""+ number;
            tmp_string.replace(new RegExp(numberL, 'g'),numberR);
            return parseInt(tmp_string);
        }
        if (srt_subtend.indexOf('sum')>-1)
        {
            if (number>0){
               var srt_tmp = "" + number;
                var new_array = srt_tmp.split("");
                var sum = 0;
                for(var k=0;k<new_array.length;k++){
                    sum+= parseInt(new_array[k]);
                }
                return sum;
            }else if (number<0){
                return -math_cal.cal(-number,"sum");
            }else
                return 0;

        }
        if (srt_subtend.indexOf('<shift')>-1)
        {
            if (number>0){
               var srt_tmp = "" + number;
                if (srt_tmp.length<=1)
                    return number;
                else{
                    var new_array = srt_tmp.split("");
                    var arr_r = [];
                    for (var j=0;j<new_array.length;j++){
                        if (j-1==-1)
                            arr_r[new_array.length-1] = new_array[0];
                        else
                            arr_r[j-1] = new_array[j];
                    }
                    return parseInt(arr_r.join(""));
                }
            }else if (number<0){
                return -math_cal.cal(-number,"<shift");
            }else
                return 0;

        }
        if (number<0){
            var tmp = srt_subtend;
            var number_new = parseInt(tmp);
            return -(-number*10+number_new);
        }else{
            var tmp = srt_subtend;
            var number_new = parseInt(tmp);
            return (number*10+number_new);
        }

    }
}

math_cal.cal_v2 = function(number,srt_subtend,arr_subtend){
    var new_sub = srt_subtend.match(/\[[\+\-\*\/]\d]/g);
    if (new_sub)
        return {
            number:number,
            srt_subtend:srt_subtend,
            arr_subtend:math_cal.convest(srt_subtend,arr_subtend)
        };
    else
    return {
        number:math_cal.cal(number,srt_subtend),
        srt_subtend:srt_subtend,
        arr_subtend:arr_subtend
    }
}

math_cal.convest = function (srt_subtend,arr_subtend){
    var arr_subtend_new = [];
    arr_subtend.forEach(function(element){
        var new_sub = srt_subtend.match(/\[[\+\-\*\/]\d]/g);
        var is_number = element.match(/^\d$/g);
        var is_sub_n = element.match(/^[\+\-\*\/]\d$/g);
        if (new_sub && (is_sub_n || is_number)){
            var first_s = new_sub[0].match(/[\+\-\*\/]/g);
            var se_s = new_sub[0].substring(new_sub[0].indexOf(first_s[0])+1,new_sub[0].indexOf(']'));
            var new_number = math_cal.cal(parseInt(element.match(/\d/g)?element.match(/\d/g)[0]:element),first_s+se_s);
            arr_subtend_new.push((element.match(/[\+\-\*\/]/g)?element.match(/[\+\-\*\/]/g)[0]:"")+new_number);
        }else
        arr_subtend_new.push(element);
    })
    return arr_subtend_new;
}

math_cal.brute_force = function (step,arr_subtend){
    var array_bf = [];
    var tree_subtend = function(arr_sourch,step,arr_subtend){
        if (step==0){
            array_bf.push(arr_sourch);
            return;
        }else{
            arr_subtend.forEach(function(element) {
                var new_array = arr_sourch.concat([]);
                new_array.push(element);
                tree_subtend(new_array,step-1,arr_subtend);
            }, [this,arr_sourch]);
        }

    }
    tree_subtend([],step,arr_subtend);
    return array_bf;
}



math_cal.find = function(soutce,des,step,arr_subtend){
    var arr_return = [];
    for (var i=1;i<=step;i++){
        var array_bf = math_cal.brute_force(i,arr_subtend);
        array_bf.forEach(function(element) {
            var cal_r = math_cal.math(soutce,element);
            if (cal_r == des ){
                arr_return.push(element);
            }
        });
    }
    return arr_return;
}


math_cal.find_v2 = function(soutce,des,step,arr_subtend){
    var arr_return = [];
    for (var i=1;i<=step;i++){
        var array_bf = math_cal.brute_force(i,arr_subtend);
        array_bf.forEach(function(element) {
            var cal_r = math_cal.math_v2(soutce,element);
            if (cal_r == des ){
                arr_return.push(element);
            }
        });
    }
    return arr_return;
}

math_cal.math = function (soutce,arr_subtend){
    var number = soutce;
    arr_subtend.forEach(function(element) {
        number = math_cal.cal(number,element);
    });
    
    return number;
}

math_cal.math_v2 = function (soutce,arr_subtend){
    var number = soutce;
    var arr_subtend_new = arr_subtend;
    for(var i=0;i<arr_subtend.length;i++){
        var obj = math_cal.cal_v2(number,arr_subtend_new[i],arr_subtend_new);
        number = obj.number;
        arr_subtend_new = obj.arr_subtend;
    }
    
    return number;
}

module.exports = math_cal;
