# Generates content used in all Candidate/User Emails


def generate_challenge_created_content(candidate):
    return f"""<table border="0" align="center" cellpadding="0" cellspacing="0"><h2 style="font-weight:normal">Hi, {candidate.first_name}! You have been assigned a Propulsion Academy Technical Challenge!</h2>
            <br></br>
            <h3 style="font-weight:normal">In order to start your challenge you need to login and go to Challenges on your personal area.</h3>
            <h3 style="font-weight:normal">Whenever you are ready to start your Technical Challenge, click on the button below.</h3>
            <br></br>
            <a href="https://tech-challenge.propulsion-learn.ch/login/"><button style="outline:none; background: #EF485C; border-radius: 40px; width: 180px; height: 40px; color: white; font-size: 16px; border: none;" >Go to login</button></a>
            <br></br>
            <br></br>
            <h3 style="font-weight:normal">If after clicking the button you are not redirected to the challenge please send us an email to support@propulsionacademy.com</h3>
            <h3 style="font-weight:normal">Regards,</h3>
            <p><strong>Full-Stack Propulsion Team</strong><br>
            Technoparkstrasse 1<br>
            8005 Zürich, Switzerland<br>
            https://propulsion.academy/full-stack</p>
            <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68"></table>"""


def generate_challenge_created_when_inactive_content(candidate):
    return f"""<table border="0" align="center" cellpadding="0" cellspacing="0"><h2 style="font-weight:normal">Hi, {candidate.first_name}! You have been assigned a Propulsion Academy Technical Challenge!</h2>
            <br></br>
            <h3 style="font-weight:normal">In order to start your challenge you need to you need to verify your email.</h3>
            <h3 style="font-weight:normal">Please click the button below to confirm your user information:</h3>
            <br></br>
            <a href="https://tech-challenge.propulsion-learn.ch/verification/{candidate.id}?email={candidate.email}&first_name={candidate.first_name}&last_name={candidate.last_name}&phone={candidate.phone}"><button style="outline:none; background: #EF485C; border-radius: 40px; width: 180px; height: 40px; color: white; font-size: 16px; border: none;" >Go to verification</button></a>
            <br></br>
            <br></br>
            <h3> After verification you can login and go to Challenges on your personal area.</h3>
            <br></br>
            <h3 style="font-weight:normal">If after clicking the button you are not redirected to the verification page please send us an email to support@propulsionacademy.com</h3>
            <h3 style="font-weight:normal">Regards,</h3>
            <p><strong>Full-Stack Propulsion Team</strong><br>
            Technoparkstrasse 1<br>
            8005 Zürich, Switzerland<br>
            https://propulsion.academy/full-stack</p>
            <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68"></table>"""


def generate_challenge_score_failed_candidate(candidate):
    return f"""<h3 style="font-weight:normal">Dear {candidate.first_name},</h3>
            <h3 style="font-weight:normal">Though you demonstrated excellent motivation and willingness to learn in trying to pass the technical challenge, additional work is required to reach the level needed to get into the program. We recommend that you keep practicing with the intention of joining a future program.</h3>
            <h3 style="font-weight:normal">Please continue reviewing the materials for the technical challenge as well as other similar online resources and let us know when you are ready to try again.</h3>
            <h3 style="font-weight:normal">All the very best,</h3>
            <br></br>
            <p><strong>Propulsion Academy</strong><br>
            Technoparkstrasse 1<br>
            8005 Zürich, Switzerland<br>
            https://propulsion.academy/full-stack</p>
            <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68">                        """


def generate_challenge_score_failed_creator(creator, candidate, challenge):
    return f"""<h3>Hi, {creator.first_name}! The candidate {candidate.first_name} {candidate.last_name} got {challenge.score}% on the Propulsion Academy Technical Challenge!</h3>
            <img height="100" src="https://cdn.shopify.com/s/files/1/1061/1924/products/Emoji_Icon_-_Sad_Emoji_grande.png?v=1571606093">
            <h3 style="font-weight:normal">Unfortunately, the candidate was not able to complete in a satisfactory manner the technical interview. Candidate was invited to participate on the next bootcamp.</h3>
            <h3 style="font-weight:normal">Regards,</h3>
            <p><strong>Propulsion Academy</strong><br>
            Technoparkstrasse 1<br>
            8005 Zürich, Switzerland<br>
            https://propulsion.academy/full-stack</p>
            <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
            """


def generate_challenge_score_needs_review_candidate(candidate, challenge):
    return f"""<h2 style="font-weight:normal">Hi, {candidate.first_name}! You got {challenge.score}% on your Propulsion Academy Technical Challenge.</h2>
            <h3 style="font-weight:normal">We can see that you are almost there! However, we believe that a little more time and practice can be decisive for you to pass the test and for this, we would like to invite you for a second technical challenge within the next 7 days. We are confident that you can do it!</h3>
            <h3 style="font-weight:normal">Expect an email from us when the next challenge becomes available on your personal area.</h3>
            <h3 style="font-weight:normal">Regards,</h3>
            <p><strong>Propulsion Academy</strong><br>
            Technoparkstrasse 1<br>
            8005 Zürich, Switzerland<br>
            https://propulsion.academy/full-stack</p>
            <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
            """


def generate_challenge_score_needs_review_creator(creator, candidate, challenge):
    return f"""<h3>Hi, {creator.first_name}! The candidate {candidate.first_name} {candidate.last_name} got {challenge.score}% on the Propulsion Academy Technical Challenge!</h3>
            <img height="110" src="https://www.emojirequest.com/images/MehEmoji.jpg">
            <h3 style="font-weight:normal">Under your discretion, the candidate can receive another opportunity.</h3>
            <h3 style="font-weight:normal">Regards,</h3>
            <p><strong>Propulsion Academy</strong><br>
            Technoparkstrasse 1<br>
            8005 Zürich, Switzerland<br>
            https://propulsion.academy/full-stack</p>
            <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
            """


def generate_challenge_score_passed_candidate(candidate):
    return f"""<h2 style="font-weight:normal">Hi, {candidate.first_name}! Congratulations! You passed the Propulsion Academy Technical Challenge!</h2>
            <img height="150" src="https://66.media.tumblr.com/5dd57c2cb2e5801f662bf8c8a7fa91ab/c073e7987cb0c13a-be/s500x750/4919f4c52044d0e2654f92f6fc28c190c1ac8f52.gif">
            <br></br>
            <h3 style="font-weight:normal">We are very happy to see that you have completed the JavaScript test! You’ve proved that dedication and continuous learning end in an excellent outcome.</h3>
            <h3 style="font-weight:normal">For the next step, we will send you an email with all the documents we need from you to make official your enrollment into the Full-Stack Development Program!</h3>
            <h3 style="font-weight:normal">Regards,</h3>
            <p><strong>Propulsion Academy</strong><br>
            Technoparkstrasse 1<br>
            8005 Zürich, Switzerland<br>
            https://propulsion.academy/full-stack</p>
            <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
            """


def generate_challenge_score_passed_creator(creator, candidate, challenge):
    return f"""<h3>Hi, {creator.first_name}! The candidate {candidate.first_name} {candidate.last_name} got {challenge.score}% on the Propulsion Academy Technical Challenge!</h3>
            <img height="100" src="https://i.pinimg.com/originals/93/76/f4/9376f4bc2cf659688e4fe9887adddc4a.png">
            <h3 style="font-weight:normal">The candidate is ready to get the documentation to get officially enrolled.</h3>
            <h3 style="font-weight:normal">Regards,</h3>
            <p><strong>Propulsion Academy</strong><br>
            Technoparkstrasse 1<br>
            8005 Zürich, Switzerland<br>
            https://propulsion.academy/full-stack</p>
            <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
            """


def generate_new_user(new_user):
    return f"""<table border="0" align="center" cellpadding="0" cellspacing="0"><h2 style="font-weight:normal">Hi, {new_user.first_name}! Welcome to your Propulsion Academy Technical Challenge Platform!</h2>
            <br></br>
            <h3 style="font-weight:normal">In order to start using the platform, you need to verify your email.</h3>
            <h3 style="font-weight:normal">Please click the button below to confirm your user information:</h3>
            <br></br>
            <a href="https://tech-challenge.propulsion-learn.ch/verification/{new_user.id}?email={new_user.email}&first_name={new_user.first_name}&last_name={new_user.last_name}&phone={new_user.phone}"><button style="outline:none; background: #EF485C; border-radius: 40px; width: 180px; height: 40px; color: white; font-size: 16px; border: none;" >Go to verification</button></a>
            <br></br>
            <br></br>
            <h3 style="font-weight:normal">You will receive a follow-up email when your Technical Interview Challenge is ready.</h3>
            <h3 style="font-weight:normal">Regards,</h3>
            <p><strong>Full-Stack Propulsion Team</strong><br>
            Technoparkstrasse 1<br>
            8005 Zürich, Switzerland<br>
            https://propulsion.academy/full-stack</p>
            <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd"></table>        """


def generate_password_reset(target_user):
    return f"""<h3> Hi, {target_user.first_name}!</h3>
            <h3 style="font-weight:normal">Your password reset validation code is:</h3>
            <h3>{target_user.code}</h3>
            <h3 style="font-weight:normal">Regards,</h3>
            <p><strong>Full-Stack Propulsion Team</strong><br>
            Technoparkstrasse 1<br>
            8005 Zürich, Switzerland<br>
            https://propulsion.academy/full-stack</p>
            <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
            """

