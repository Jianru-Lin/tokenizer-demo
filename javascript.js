tokenizer('comment.line', function(c, pos, eof) {
    if (c === '/') {
        return ['yes', f1]
    }
    else {
        return ['no']
    }
    
    function f1(c, pos, eof) {
        if (c === '/') {
            return ['yes', f2]
        }
        else {
            return ['no']
        }
    }
    
    function f2(c, pos, eof) {
        if (c === '\n') {
            return ['yes', 'success']
        }
        else if (eof) {
            return ['no', 'success']
        }
        else {
            return ['yes', f2]
        }
    }
})

tokenizer('string', function(c, pos, eof) {
    var head
    if (c === '\'' || c === '"') {
        head = c
        return ['yes', f1]
    }
    else {
        return ['no']
    }
    
    function f1(c, pos, eof) {
        if (eof) {
            return ['no']
        }
        else if (c === head) {
            return ['yes', 'success']
        }
        else if (c === '\\') {
            return ['yes', f2]
        }
        else {
            return ['yes', f1]
        }
    }
    
    function f2(c, pos, eof) {
        if (eof) {
            return ['no']
        }
        else {
            return ['yes', f1]
        }
    }
})

tokenizer('whitespace', function(c, pos, eof) {
    if (/^\s$/.test(c)) {
        return ['yes', f1]
    }
    else {
        return ['no']
    }
    
    function f1(c, pos, eof) {
        if (/^\s$/.test(c)) {
            return ['yes', f1]
        }
        else {
            return ['no', 'success']
        }
    }
})

tokenizer('identifier', function(c, pos, eof) {
    if (/^[a-zA-Z_\$]$/.test(c)) {
        return ['yes', body]
    }
    else {
        return ['no']
    }
    
    function body(c, pos, eof) {
        if (/^[a-zA-Z0-9_\$]$/.test(c)) {
            return ['yes', body]
        }
        else {
            return ['no', 'success']
        }
    }
})

tokenizer('operator', function(c, pos, eof) {
    if ('{}()[].;,<>=!+-*%&|^~?:'.indexOf(c) >= 0) {
        return ['yes', 'success']
    }
    else {
        return ['no']
    }
})

tokenizer('number.decimal', function(c, pos, eof) {
    if (isnum(c)) {
        return ['yes', more_num]
    }
    else if (c === '.') {
        return ['yes', sub_char_1]
    }
    else {
        return ['no']
    }
    
    function more_num(c, pos, eof) {
        if (isnum(c)) {
            return ['yes', more_num]
        }
        else if (c === '.') {
            return ['yes', sub_char_1]
        }
        else if (c === 'e' || c === 'E') {
            return ['yes', exp_char_1]
        }
        else {
            return ['no', 'success']
        }
    }
    
    function sub_char_1(c, pos, eof) {
        if (isnum(c)) {
            return ['yes', sub_char_n]
        }
        else {
            return ['no']
        }
    }
    
    function sub_char_n(c, pos, eof) {
        if (isnum(c)) {
            return ['yes', sub_char_n]
        }
        else if (c === 'e' || c === 'E') {
            return ['yes', exp_char_1]
        }
        else {
            return ['no', 'success']
        }
    }
    
    function exp_char_1(c, pos, eof) {
        if (c === '+' || c === '-') {
            return ['yes', exp_num_1]
        }
        else if (isnum(c)) {
            return ['yes', exp_char_n]
        }
        else {
            return ['no']
        }
    }
    
    function exp_num_1(c, pos, eof) {
        if (isnum(c)) {
            return ['yes', exp_char_n]
        }
        else {
            return ['no']
        }
    }
    
    function exp_char_n(c, pos, eof) {
        if (isnum(c)) {
            return ['yes', exp_char_n]
        }
        else {
            return ['no', 'success']
        }
    }
    
    function isnum(c) {
        return '0123456789'.indexOf(c) !== -1
    }
})

tokenizer('number.hex', function(c, pos, eof) {
    if (c === '0') {
        return ['yes', x]
    }
    else {
        return ['no']
    }
    
    function x(c, pos, eof) {
        if (c === 'x' || c === 'X') {
            return ['yes', hexDigit]
        }
        else {
            return ['no']
        }
    }
    
    function hexDigit(c, pos, eof) {
        if ('0123456789abcdefABCDEF'.indexOf(c) !== -1) {
            return ['yes', hexDigit]
        }
        else {
            return ['no', 'success']
        }
    }
})