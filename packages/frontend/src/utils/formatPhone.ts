import PhoneNumber from 'awesome-phonenumber';

export default function formatPhone(number: string) {
    return new PhoneNumber(number).getNumber('national');
}
