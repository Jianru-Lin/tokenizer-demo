tokenizer('number', number)

tokenizer('dot-number', function(c, pos, eof) {
    if (c === '.') {
        return ['yes', wrap(number, after_number)]
    }
    else {
        return ['no']
    }
    
    function after_number(status) {
        if (status[1] === 'success') {
            return ['yes', end]
        }
        else {
            return status
        }
    }
    
    function end(c, pos, eof) {
        alert('end')
        if (c === '$') {
            return ['yes', 'success']
        }
        else {
            return ['no']
        }
    }
})

function number(c, pos, eof) {
    if (isnum(c)) {
        return ['yes', number_more]
    }
    else {
        return ['no']
    }
    
    function number_more(c, pos, eof) {
        if (isnum(c)) {
            return ['yes', number_more]
        }
        else {
            return ['no', 'success']
        }
    }
    
    function isnum(c) {
        return '0123456789'.indexOf(c) !== -1
    }
}

// # cb(status)
function wrap(tokenizer, cb) {
    return wrap_step(tokenizer, next)
    
    function next(status) {
        if (status[0] === 'yes' && typeof status[1] === 'function') {
            return ['yes', wrap_step(status[1], next)]
        }
        else {
            return cb(status)
        }
    }
}

// # cb(status) -> modified_status
function wrap_step(tokenizer, cb) {
    return hook
    
    function hook(c, pos, eof) {
        var status = tokenizer(c, pos, eof)
        return cb(status)
    }
}

// function and(a, b) {
    
// }

// function or(a, b) {
    
// }

// // # predicate(c, pos, eof)
// // # cb(status)
// function onemore(predicate) {
//     var count = 0
//     return ['ε', do_predicate]
    
//     function do_predicate(c, pos, eof) {
//         if (predicate(c, pos, eof)) {
//             ++count
//             return ['yes', do_predicate]
//         }
//         else {
//             if (count > 0) {
//                 return ['yes', 'success']
//             }
//             else {
//                 return ['no']
//             }
//         }
//     }
// }