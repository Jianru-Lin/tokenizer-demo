tokenizer('0n1n', function(c, pos, eof) {
    var head = '{'
    var head_n = 0
    var tail = '}'
    var tail_n = 0
    
    if (c === head) {
        head = c
        ++head_n
        return ['yes', more_head]
    }
    else {
        return ['no']
    }
    
    function more_head(c, pos, eof) {
        if (eof) {
            return ['no']
        }
        else if (c === head) {
            ++head_n
            return ['yes', more_head]
        }
        else if (c === tail) {
            ++tail_n
            return ['yes', more_tail]
        }
        else {
            return ['no']
        }
    }
    
    function more_tail(c, pos, eof) {
        if (eof) {
            if (tail_n === head_n) {
                return ['no', 'success']
            }
            else {
                return ['no']
            }
        }
        else if (c === tail) {
            ++tail_n
            return ['yes', more_tail]
        }
        else {
            return ['no']
        }
    }
})