With 1 bit you can represent 2 values (0 or 1)
With 4 bits you can represent 16 values (0 to 15)
With 1 hex character (4 bits) you can represent 16 values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, f
So 4 bits = 1 hex character

How are adresses generated :

256-bit random number
        |
        |  (this IS your private key : 64 hex chars)
        V
Elliptic curve multiplication with G
        |
        |  (produces public key : 512 bits, 128 hex chars)
        V
Keccak-256 hash
        |
        |  (produces 256 bits : 64 hex chars)
        V
Drop first 12 bytes, keep last 20
        |
        V
Address (160 bits = 20 bytes : 40 hex chars)